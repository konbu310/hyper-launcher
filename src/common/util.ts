// ______________________________________________________
//
// @ パスからアプリ名を取得する
//
export const pathToName = (path: string): string => {
  const match = path.match(/\/.+\/(.+[^\/]).app/);
  return (match && match[1]) || "";
};
