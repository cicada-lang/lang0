import { Exp } from "./exp"
import { ReadbackCtx } from "./readback"

export abstract class Neutral {
  abstract readback(ctx: ReadbackCtx): Exp
}
