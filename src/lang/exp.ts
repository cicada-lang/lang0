import { Env } from "./env"
import { ReadbackCtx } from "./readback"
import { Value } from "./value"
import { AlphaCtx } from "./alpha-ctx"

export abstract class Exp {
  abstract evaluate(env: Env): Value
  abstract format(): string


  normalize(env: Env = new Env()): Exp {
    const value = this.evaluate(env)
    const normal = value.readback(ReadbackCtx.init())
    return normal
  }

  equal(that: Exp, env: Env): boolean {
    return this.normalize(env).alphaEqual(AlphaCtx.init(), that.normalize(env))
  }

  abstract alphaEqual(ctx: AlphaCtx, that: Exp): boolean
}
