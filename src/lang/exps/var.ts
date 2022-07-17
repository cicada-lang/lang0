import { AlphaCtx } from "../alpha-ctx"
import { Env } from "../env"
import { Exp } from "../exp"
import { Value } from "../value"

export class Var extends Exp {
  constructor(public name: string) {
    super()
  }

  evaluate(env: Env): Value {
    const value = env.findValue(this.name)
    if (value === undefined) {
      throw new Error(`Unknown variable: ${this.name}`)
    }

    return value
  }

  format(): string {
    return this.name
  }

  alphaEqual(ctx: AlphaCtx, that: Exp): boolean {
    if (that instanceof Var) {
      return ctx.hasPair([this.name, that.name])
    } else {
      return false
    }
  }
}
