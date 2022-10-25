class Signature {
  private pageSequence: number[];
  public pages: number;
  public sheets: number;
  constructor(sheets: number) {
    this.sheets = sheets;
    this.pages = 4 * this.sheets;
    this.pageSequence = [];
  }
  getPageSequence() {
    if (this.pageSequence.length == 0) {
      let index = 0;
      let next = this.pages - 1;
      while (index < this.pages) {
        this.pageSequence.push(next);
        const step = index % 4;
        if (step % 2 == 0) {
          next = this.pages - 1 - next;
        } else if (step % 4 == 1) {
          ++next;
        } else if (step % 4 == 3) {
          --next;
        }
        ++index;
      }
    }
    return this.pageSequence;
  }
}

class Book {
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

const book = new Book([new Signature(4), new Signature(4)]);
console.log(book.pageNumbers.map((x) => x + 1));
