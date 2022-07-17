import { Value } from "./value"

export class Env {
  constructor(public values: Map<string, Value> = new Map()) {}

  extend(name: string, value: Value): Env {
    const values: Map<string, Value> = new Map()
    for (const [k, v] of this.values) {
      values.set(k, v)
    }

    values.set(name, value)
    return new Env(values)
  }

  findValue(name: string): Value | undefined {
    return this.values.get(name)
  }
}
