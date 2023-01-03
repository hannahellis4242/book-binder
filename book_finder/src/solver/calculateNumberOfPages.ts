import Candidate from "./Canditate";

const calculateNumberOfPages = (xs: [number, number][]): number =>
  4 *
  xs.map(([pages, number]) => pages * number).reduce((acc, x) => acc + x, 0);

export default calculateNumberOfPages;
