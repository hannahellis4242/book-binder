import Book from "./Book";
import { v4 } from "uuid";
import Signature from "./Signature";

export default class Library {
  signaturesToKey: Map<string, string>;
  keyToBook: Map<string, Book>;
  constructor() {
    this.signaturesToKey = new Map<string, string>();
    this.keyToBook = new Map<string, Book>();
  }
  async register(signaturesStr: string) {
    const createNewKey = () => {
      const key = v4();
      this.signaturesToKey.set(signaturesStr, key);
      this.createBookForKey(signaturesStr, key);
      return key;
    };
    return this.signaturesToKey.get(signaturesStr) || createNewKey();
  }
  private async createBookForKey(signaturesStr: string, key: string) {
    const signatures = signaturesStr
      .split(",")
      .map((x) => parseInt(x, 10))
      .map((s) => new Signature(s));
    const book = new Book(signatures);
    this.keyToBook.set(key, book);
  }
  book(key: string) {
    return this.keyToBook.get(key);
  }
}
