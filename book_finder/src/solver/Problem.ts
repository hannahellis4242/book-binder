import NumberRange from "./NumberRange";

export default interface Problem {
  range: NumberRange;
  allowed: number[];
}
