import { Exp } from "./exp"
import { ReadbackCtx } from "./readback"

export abstract class Value {
  abstract apply(arg: Value): Value
  abstract readback(ctx: ReadbackCtx): Exp
  abstract format(): string
  abstract formatWithoutEnv(): string
}
