import calculateNumberOfPages from "./calculateNumberOfPages";
import Candidate from "./Canditate";
import convertCandidateToSignatures from "./convertCanditateToSignatures";
import Problem from "./Problem";
import Signatures from "./Signatures";
import byNumberOfPages from "./byNumberOfPages";
import uniq from "../utils/uniq";
import zip from "../utils/zip";
import grow from "./grow";
import allOf from "../utils/allOf";
import NumberRange from "./NumberRange";
import { volume } from "./maxiums";

/*const DEBUG_ON = true;
const debug = DEBUG_ON
  ? <T>(
      name: string,
      fn: (problem: Problem, candidate: Candidate) => T,
      problem: Problem,
      candidate: Candidate
    ) => {
      const result = fn(problem, candidate);
      console.log(`---------${name}---------\n
  input:\n\tproblem: ${JSON.stringify(
    problem,
    null,
    2
  )}\n\tcandidate: ${JSON.stringify(candidate, null, 2)}\n
  return: ${result}\n
  =========${name}=========`);
      return result;
    }
  : <T>(
      _: string,
      fn: (problem: Problem, candidate: Candidate) => T,
      problem: Problem,
      candidate: Candidate
    ) => fn(problem, candidate);
    */
const root = (p: Problem): [Candidate] => [
  p.allowed.map((a) => Math.floor(p.range.min / (4 * a))),
];

const allValuesPositive = (p: number[]) => allOf((x) => x >= 0, p);

const accept =
  ({ allowed, range }: Problem) =>
  (c: Candidate) =>
    allValuesPositive(c) &&
    range.contains(calculateNumberOfPages(zip(allowed, c)));

type Point = number[];

const search =
  (saftey: number) =>
  (accept: (c: Candidate) => boolean) =>
  (points: Point[]): number[] => {
    console.log("--------------search--------------");
    console.log("saftey :", saftey);
    console.log("trail points : (", points.length, ")", JSON.stringify(points));

    const allowed = points.find(accept);
    if (allowed) {
      console.log("found a point :", allowed);
      console.log("==============search==============");
      return allowed;
    }
    if (saftey < 0) {
      console.log("hit saftey valve");
      console.log("==============search==============");
      return [];
    }
    console.log("No point found yet, growing trail points");
    console.log("==============search==============");
    return search(saftey - 1)(accept)(
      uniq(points.flatMap(grow).sort(), pointEquality)
    );
  };

const pointEquality = (a: Point, b: Point) => {
  return allOf(([a, b]) => a === b, zip(a, b));
};

const fill = (condition: (p: Point) => boolean, points: Point[]): Point[] => {
  const possible = uniq(
    points.flatMap(grow).flatMap(grow).concat(points),
    pointEquality
  ).filter(condition);
  if (possible.length === points.length) {
    return points;
  }
  return fill(condition, possible);
};

const allPoints = ({ allowed }: Problem, max: number) => {};
const solve = (
  target: number,
  max: number,
  allowedPagesPerSignature: number[]
): Signatures[] => {
  //make sure allowed is sorted and unique
  const allowed = uniq(allowedPagesPerSignature.sort());
  //precalculate the allowed range
  const range = new NumberRange(target, max);
  const problem: Problem = { range, allowed };
  const acceptFn = accept(problem);
  const start = search(Math.ceil(volume(problem, max) / 2))(acceptFn)(
    root(problem)
  );
  const solutions = fill(acceptFn, [start]);
  return solutions
    .sort(byNumberOfPages(problem))
    .map((candidate) => convertCandidateToSignatures(problem, candidate));
};

export default solve;
