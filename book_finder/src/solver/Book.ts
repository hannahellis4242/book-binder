import zip from "../utils/zip";

export class SignatureCount {
  constructor(public pages: number, public count: number) {}
  totalPages() {
    return 4 * this.pages * this.count;
  }
  toString() {
    return `${this.pages}:${this.count}`;
  }
}

export default class Book {
  signatureCounts: SignatureCount[];
  pages: number;
  constructor(signatureSizes: number[], counts: number[]) {
    this.signatureCounts = zip(signatureSizes, counts)
      .filter(([_, y]) => y !== 0)
      .map(([pages, count]) => new SignatureCount(pages, count));
    this.pages = this.signatureCounts
      .map((x) => x.totalPages())
      .reduce((x, y) => x + y, 0);
  }
  getPages() {
    return this.pages;
  }
  getSignatureCounts() {
    return this.signatureCounts;
  }
  toString() {
    return `[${this.signatureCounts.map((x) => x.toString()).join(",")}] - ${
      this.pages
    }`;
  }
}
