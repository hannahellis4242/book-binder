const app = (fn: (x: number) => number) => (i: number) => (p: number[]) => {
  const cp = [...p];
  cp[i] = fn(cp[i]);
  return cp;
};

const grow = (p: number[]): number[][] => {
  const ups = p.map((_, i) => app((x) => x + 1)(i)(p));
  const downs = p.map((_, i) => app((x) => x - 1)(i)(p));
  return ups.concat(downs);
};

export default grow;
