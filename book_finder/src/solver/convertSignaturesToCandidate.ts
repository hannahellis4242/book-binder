import Candidate from "./Canditate";
import Signatures from "./Signatures";

const convertSignaturesToCandidate = (x: Signatures): Candidate =>
  Object.entries<number>(x)
    .map(([key, value]) => [Number(key), value])
    .filter(([key, _]) => !Number.isNaN(key))
    .reduce((acc, [k, v]) => acc.concat([[k, v]]), [] as Candidate);

export default convertSignaturesToCandidate;
