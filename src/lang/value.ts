import { Exp } from "./exp"
import { ReadbackCtx } from "./readback"

export abstract class Value {
  abstract apply(arg: Value): Value
  abstract readback(ctx: ReadbackCtx): Exp

  equal(that: Value): boolean {
    const thisNormal = this.readback(ReadbackCtx.init())
    const thatNormal = that.readback(ReadbackCtx.init())

    return thisNormal.alphaEqual(thatNormal)
  }
}
