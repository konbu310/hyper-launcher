type SomeNonNullable<T, TKey> = {
  [P in keyof T]: P extends TKey ? NonNullable<T[P]> : T[P];
};

export const nonNullableObj = <T, TKey extends keyof T>(
  obj: T
): obj is SomeNonNullable<T, TKey> => {
  for (const key in obj) {
    if (obj[key] == null) {
      console.log(`${key} is missing`);
      return false;
    }
  }

  return true;
};
