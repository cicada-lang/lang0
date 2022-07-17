import { Env } from "./env"
import { ReadbackCtx } from "./readback"
import { Value } from "./value"

export abstract class Exp {
  abstract evaluate(env: Env): Value
  abstract format(): string

  normalize(): Exp {
    const value = this.evaluate(new Env())
    const normal = value.readback(ReadbackCtx.init())
    return normal
  }

  // abstract alphaEqual(ctx: AlphaCtx, that: Exp): boolean

  alphaEqual(that: Exp): boolean {
    throw new Error("TODO")
  }
}
