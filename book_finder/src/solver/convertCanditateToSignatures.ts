import Candidate from "./Canditate";
import Signatures from "./Signatures";

const convertCandidateToSignatures = (x: Candidate): Signatures =>
  Object.fromEntries<number>(x);
export default convertCandidateToSignatures;
