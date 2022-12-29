import { backtrackFull } from "./backtrack";
import calculateNumberOfPages from "./calculateNumberOfPages";
import Candidate from "./Canditate";
import convertCandidateToSignatures from "./convertCanditateToSignatures";
import Problem from "./Problem";
import Signatures from "./Signatures";

const reject = (problem: Problem, candidate: Candidate) =>
  calculateNumberOfPages(candidate) > problem.range.max;

const accept = (problem: Problem, candidate: Candidate) =>
  calculateNumberOfPages(candidate) >= problem.range.min;

const first = (problem: Problem, candidate: Candidate): Candidate | null => {
  if (problem.allowed.length === 0) {
    //no first candidate
    return null;
  }
  const signaturesUsed: number[] = candidate.map(([x, _]) => x);
  const maxPages = Math.max(...signaturesUsed);
  const nextAllowed = problem.allowed.filter((x) => x > maxPages).at(0);
  if (!nextAllowed) {
    //no more options available
    return null;
  }
  return [...candidate, [nextAllowed, 1]];
};

const next = (problem: Problem, candidate: Candidate): Candidate | null =>
  candidate.map(([k, v], i) => [k, i === candidate.length - 1 ? v + 1 : v]);

const root = (_: Problem): Candidate => [];

const solve = (
  target: number,
  allowedPagesPerSignature: number[]
): Signatures[] => {
  //make sure allowed is sorted and unique
  const allowed = Array.from(new Set(allowedPagesPerSignature)).sort();
  //precalculate the allowed range
  const maxSignatureSize = allowed[allowed.length - 1];
  const range = {
    min: target,
    max: Math.ceil(target / (4 * maxSignatureSize)),
  };
  const problem: Problem = { range, allowed: allowedPagesPerSignature };
  const solutions: Candidate[] = [];
  backtrackFull<Problem, Candidate>(
    problem,
    root,
    reject,
    accept,
    (p: Problem, c: Candidate) => solutions.push(c),
    first,
    next
  );
  return solutions.map(convertCandidateToSignatures);
};

export default solve;
