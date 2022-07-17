import { Env } from "../env"
import { Exp } from "../exp"
import { Stmt } from "../stmt"
import { ReadbackCtx } from "../readback"

export class Compute extends Stmt {
  constructor(public exp: Exp) {
    super()
  }

  execute(env: Env): Env {
    const value = this.exp.evaluate(env)
    const normal = value.readback(ReadbackCtx.init())
    console.log(normal.format())
    return env
  }
}
