import Signature from "./Signature";

export default class Book {
  public pageNumbers: number[];
  constructor(private signatures: Signature[]) {
    this.pageNumbers = [];
    let runningPageNumbers = 0;
    this.signatures.forEach((signature) => {
      const pagesInSignature = signature.pages;
      const squence = signature.getPageSequence();
      squence.forEach((pageNumber) => {
        this.pageNumbers.push(runningPageNumbers + pageNumber);
      });
      runningPageNumbers += pagesInSignature;
    });
  }
}

export const createBookForSignaturesArray = (arr: number[]) =>
  new Book(arr.map((sheets) => new Signature(sheets)));
