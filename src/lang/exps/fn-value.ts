import { Env } from "../env"
import { Exp } from "../exp"
import * as Exps from "../exps"
import { freshen } from "../freshen"
import { ReadbackCtx } from "../readback"
import { Value } from "../value"

export class FnValue extends Value {
  constructor(public name: string, public body: Exp, public env: Env) {
    super()
  }

  apply(arg: Value): Value {
    return this.body.evaluate(this.env.extend(this.name, arg))
  }

  readback(ctx: ReadbackCtx): Exp {
    const freshName = freshen(ctx.usedNames, this.name)
    ctx = ctx.useName(freshName)
    const freshVariable = new Exps.NotYetValue(new Exps.VarNeutral(freshName))
    const body = this.apply(freshVariable)
    return new Exps.Fn(freshName, body.readback(ctx))
  }

  format(): string {
    return (
      `(lambda (${this.name}) ${this.body.format()})` + "\n" + this.env.format()
    )
  }

  formatWithoutEnv(): string {
    return `(lambda (${this.name}) ${this.body.format()})`
  }
}
