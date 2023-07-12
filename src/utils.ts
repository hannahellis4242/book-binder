export const encode = (plain: string): string =>
  Buffer.from(plain).toString("base64url");

export const decode = (encoded: string) =>
  Buffer.from(encoded, "base64url").toString();
