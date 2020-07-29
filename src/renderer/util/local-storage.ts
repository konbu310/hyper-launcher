/*シリアライズに成功したかどうかもBooleanで返すようにする*/
/*stateのプロパティが完全かどうかもチェックする機構が必要?*/

export type LocalStorageObject<T> = T & {
  storedAt: Date;
  expiredAt?: Date;
};

type SaveArgs<T> = {
  key: string;
  object: T;
  expiredAt?: Date;
};

type RestoreArgs = {
  key: string;
};

type RestoreReturnValues<T> = {
  data: T | null;
  storedAt: Date | null;
};

export const saveToLocalStorage = <T>(args: SaveArgs<T>): boolean => {
  if (localStorage) {
    try {
      const o: LocalStorageObject<T> = {
        ...args.object,
        storedAt: new Date(),
        expiredAt: args.expiredAt,
      };
      localStorage.setItem(args.key, JSON.stringify(o));
      return true;
    } catch (err) {
      console.error(err);
    }
  }
  return false;
};

export const restoreFromLocalStorage = <T>(
  args: RestoreArgs
): RestoreReturnValues<T> => {
  if (localStorage) {
    const o = localStorage.getItem(args.key);
    if (o) {
      const now = new Date();
      const data: LocalStorageObject<T> = JSON.parse(o);
      const { storedAt, expiredAt } = data;

      if (expiredAt && new Date(expiredAt).getTime() < now.getTime()) {
        return { data: null, storedAt };
      }

      delete data.expiredAt;
      delete data.storedAt;

      return { data, storedAt };
    }
    return { data: null, storedAt: null };
  }
  return { data: null, storedAt: null };
};
