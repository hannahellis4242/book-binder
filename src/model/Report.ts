export default interface Report {
  pages: number;
  maxAllowed: number;
  sizes: number[];
  signatureOptions: string[];
  selectedOption: string;
  sequence: number[];
  pageSequence: number[];
  signiturePageSequence: number[][];
}
