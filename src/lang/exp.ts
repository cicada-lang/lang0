import { Env } from "./env"
import { Value } from "./value"
import { ReadbackCtx } from "./readback"

export abstract class Exp {
  abstract evaluate(env: Env): Value
  abstract format(): string

  normalize(): Exp {
    const value = this.evaluate(new Env())
    const normal = value.readback(ReadbackCtx.init())
    return normal
  }
}
