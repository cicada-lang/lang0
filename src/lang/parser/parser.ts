import { match, matchList, matchSymbol } from "@cicada-lang/sexp/lib/match"
import { Parser as SexpParser } from "@cicada-lang/sexp/lib/parser"
import { cons, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { Stmt } from "../stmt"
import * as Stmts from "../stmts"

export class Parser extends SexpParser {
  constructor() {
    super({
      quotes: [],
      parentheses: [{ start: "(", end: ")" }],
      comments: [";"],
    })
  }

  parseExp(text: string): Exp {
    const sexp = this.parseSexp(text)
    return matchExp(sexp)
  }

  parseStmts(text: string): Array<Stmt> {
    return this.parseSexps(text).map(matchStmt)
  }
}

function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
    [
      ["define", v("name"), v("exp")],
      ({ name, exp }) => new Stmts.Define(matchSymbol(name), matchExp(exp)),
    ],

    [
      ["assert-equal", v("exp1"), v("exp2")],
      ({ exp1, exp2 }) => new Stmts.AssertEqual(matchExp(exp1), matchExp(exp2))
    ],

    [v("exp"), ({ exp }) => new Stmts.Compute(matchExp(exp))],
  ])
}

function matchExp(sexp: Sexp): Exp {
  return match<Exp>(sexp, [
    [
      ["lambda", v("names"), v("exp")],
      ({ names, exp }) => {
        let fn = matchExp(exp)
        for (const name of [...matchList(names, matchSymbol)].reverse()) {
          fn = new Exps.Fn(name, fn)
        }

        return fn
      },
    ],

    [
      cons(v("target"), v("args")),
      ({ target, args }) => {
        let result = matchExp(target)
        for (const arg of matchList(args, matchExp)) {
          result = new Exps.Ap(result, arg)
        }

        return result
      },
    ],

    [v("name"), ({ name }) => new Exps.Var(matchSymbol(name))],
  ])
}

// [
//   ["lambda", [v("name")], v("exp")],
//   ({ name, exp }) => new Exps.Fn(matchSymbol(name), matchExp(exp)),
// ],

// // NOTE The keywords must be matched before `ap` and `var`.

// [
//   [v("target"), v("arg")],
//   ({ target, arg }) => new Exps.Ap(matchExp(target), matchExp(arg)),
// ],
