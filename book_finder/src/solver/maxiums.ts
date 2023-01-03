import Problem from "./Problem";

export const maximums = ({ allowed }: Problem, maxPages: number) =>
  allowed.map((a) => Math.ceil(maxPages / (4 * a)));

export const volume = (p: Problem, maxPages: number) =>
  maximums(p, maxPages).reduce((acc, x) => acc * x, 1);
