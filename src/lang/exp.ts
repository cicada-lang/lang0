import { Env } from "./env"
import { ReadbackCtx } from "./readback"
import { Value } from "./value"
import { AlphaCtx } from "./alpha-ctx"

export abstract class Exp {
  abstract evaluate(env: Env): Value
  abstract format(): string

  normalize(): Exp {
    const value = this.evaluate(new Env())
    const normal = value.readback(ReadbackCtx.init())
    return normal
  }

  equal(that: Exp): boolean {
    return this.normalize().alphaEqual(AlphaCtx.init(), that.normalize())
  }

  abstract alphaEqual(ctx: AlphaCtx, that: Exp): boolean
}
