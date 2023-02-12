import zip from "../utils/zip";

export default interface Signatures {
  [key: number]: number;
}

export const createSignatures = (signatureSizes: number[], counts: number[]) =>
  zip(signatureSizes, counts)
    .filter(([_, count]) => count !== 0)
    .reduce<Signatures>((signatures, [size, count]) => {
      signatures[size] = count;
      return signatures;
    }, {});
