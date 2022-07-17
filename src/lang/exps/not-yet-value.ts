import { Exp } from "../exp"
import * as Exps from "../exps"
import { Value } from "../value"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../readback"

export class NotYetValue extends Value {
  constructor(public neutral: Neutral) {
    super()
  }

  readback(ctx: ReadbackCtx): Exp {
    return this.neutral.readback(ctx)
  }

  apply(arg: Value): Value {
    throw new Error("TODO")
    // return new Exps.NotYetValue(new Exps.ApNeutral(this.neutral, arg))
  }

  format(): string {
    throw new Error("TODO")
  }

  formatWithoutEnv(): string {
    throw new Error("TODO")
  }
}
