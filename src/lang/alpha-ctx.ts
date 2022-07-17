export class AlphaCtx {
  namePairs: Set<string>

  constructor(options: { namePairs: Set<string> }) {
    this.namePairs = options.namePairs
  }

  static init(): AlphaCtx {
    return new AlphaCtx({
      namePairs: new Set(),
    })
  }

  addPair(pair: [string, string]): AlphaCtx {
    return new AlphaCtx({
      ...this,
      namePairs: new Set([...this.namePairs, JSON.stringify(pair)]),
    })
  }

  hasPair(pair: [string, string]): boolean {
    return this.namePairs.has(JSON.stringify(pair))
  }
}