import { Env } from "../env"
import { Exp } from "../exp"
import { Value } from "../value"
import { AlphaCtx } from "../alpha-ctx"

export class Ap extends Exp {
  constructor(public target: Exp, public arg: Exp) {
    super()
  }

  evaluate(env: Env): Value {
    const target = this.target.evaluate(env)
    const arg = this.arg.evaluate(env)
    return target.apply(arg)
  }

  format(): string {
    return `(${this.target.format()} ${this.arg.format()})`
  }

  alphaEqual(ctx: AlphaCtx, that: Exp): boolean {
    if (that instanceof Ap) {
      return this.target.alphaEqual(ctx, that.target) && this.arg.alphaEqual(ctx, that.arg)
    } else {
      return false
    }
  }
}
