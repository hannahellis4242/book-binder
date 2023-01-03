import zip from "../utils/zip";
import calculateNumberOfPages from "./calculateNumberOfPages";
import Candidate from "./Canditate";
import Problem from "./Problem";
import Signatures from "./Signatures";

const convertCandidateToSignatures = (p: Problem, x: Candidate): Signatures => {
  const entries = zip(p.allowed, x);
  const out = Object.fromEntries<number>(
    entries.filter(([_, value]) => value !== 0)
  );
  out["pages"] = calculateNumberOfPages(entries);
  return out;
};
export default convertCandidateToSignatures;
