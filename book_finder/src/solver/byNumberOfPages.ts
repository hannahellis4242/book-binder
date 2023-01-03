import calculateNumberOfPages from "./calculateNumberOfPages";
import Candidate from "./Canditate";
import Problem from "./Problem";
import zip from "../utils/zip";

const byNumberOfPages =
  ({ allowed }: Problem) =>
  (a: Candidate, b: Candidate) => {
    return (
      calculateNumberOfPages(zip(allowed, a)) -
      calculateNumberOfPages(zip(allowed, b))
    );
  };

export default byNumberOfPages;
