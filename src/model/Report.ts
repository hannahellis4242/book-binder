import SignatureList from "./SignatureFinder/SignatureList";

export default interface Report {
  pages: number;
  maxAllowed: number;
  sizes: number[];
  signatureOptions: SignatureList[];
  selectedOption: SignatureList;
  sequence: number[];
  pageSequence: number[];
  signiturePageSequence: number[][];
}
