// ______________________________________________________
//
// @ パスからアプリ名を取得する
//
export const pathToName = (path: string): string => {
  const match = path.match(/\/.+\/(.+[^\/]).app/);
  return (match && match[1]) || "";
};

/**
 * get()がundefinedを返さないMap
 */
export class DefaultMap<K, V> extends Map<K, V> {
  constructor(provider: (key: K) => V);
  constructor(
    provider: (key: K) => V,
    entries?: ReadonlyArray<readonly [K, V]> | null
  );
  constructor(
    private readonly provider: (key: K) => V,
    entries?: ReadonlyArray<readonly [K, V]> | null
  ) {
    super(entries);
  }
  get(key: K): V {
    let v = super.get(key);
    if (!v) {
      v = this.provider(key);
      super.set(key, v);
    }
    return v;
  }
}
