import Candidate from "./Canditate";

const calculateNumberOfPages = (candidate: Candidate): number =>
  candidate.reduce((total, [pages, number]) => total + 4 * pages * number, 0);

export default calculateNumberOfPages;
