export interface Inclusive {
  min: boolean;
  max: boolean;
}
export default class NumberRange {
  private minFn: (x: number) => boolean;
  private maxFn: (x: number) => boolean;
  constructor(
    public min: number,
    public max: number,
    inc: Inclusive = { min: true, max: true }
  ) {
    this.minFn = inc.min
      ? (x: number) => x >= this.min
      : (x: number) => x > this.min;
    this.maxFn = inc.max
      ? (x: number) => x <= this.max
      : (x: number) => x < this.max;
  }
  contains = (x: number) => this.minFn(x) && this.maxFn(x);
}
