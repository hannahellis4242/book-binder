import Signatures from "./Signatures";

export const pagesInSignature = (signatureSize: number) => 4 * signatureSize;

export const getPageCount = (x: Signatures) =>
  Object.entries(x)
    .map(([key, value]) => [Number(key), value])
    .map(([signatureSize, count]) => pagesInSignature(signatureSize) * count)
    .reduce((x, y) => x + y, 0);
