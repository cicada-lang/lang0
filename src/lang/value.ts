import { ReadbackCtx } from "./readback"
import { Exp } from "./exp"

export abstract class Value {
  abstract apply(arg: Value): Value
  abstract readback(ctx: ReadbackCtx): Exp
  abstract format(): string
  abstract formatWithoutEnv(): string
}
