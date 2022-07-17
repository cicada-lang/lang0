import { Env } from "../env"
import { Exp } from "../exp"
import { Stmt } from "../stmt"
import { ReadbackCtx } from "../readback"

export class AssertEqual extends Stmt {
  constructor(public exp1: Exp, public exp2: Exp) {
    super()
  }

  execute(env: Env): Env {
    let res = this.exp1.equal(this.exp2, env)
    if (!res) {
      console.log(this.exp1.format() + " isn't equal to " + this.exp2.format())
    }
    return env
  }
}
