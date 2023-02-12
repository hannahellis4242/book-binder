import { getPageCount } from "./pages";
import Signatures, { createSignatures } from "./Signatures";

export default class Book {
  public pages: number;
  constructor(public signatures: Signatures) {
    this.pages = getPageCount(signatures);
  }
}

export const createBook = (signatureSizes: number[], counts: number[]) => {
  return new Book(createSignatures(signatureSizes, counts));
};
