import Report from "../model/Report";
import { writeSignatureOption } from "./signatureOptionIO";

const showSequence = (x: number[]): string =>
  x.map((x) => x.toString()).join(", ");
const showSignaturePages = (x: number[][]) =>
  x.map((x) => showSequence(x)).join("\n");

const showReport = ({
  selectedOption,
  sequence,
  signaturePageSequence,
  pageSequence,
}: Report): string =>
  `${writeSignatureOption(selectedOption)}\n` +
  `signature sequence : ${showSequence(sequence)}\n` +
  "page order:\n" +
  "--------------------\n" +
  "by signature\n" +
  `${showSignaturePages(signaturePageSequence)}\n\n` +
  "full page squence :\n" +
  `${showSequence(pageSequence)}`;
export default showReport;
