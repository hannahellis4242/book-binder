const zip = <A, B>(xs: A[], ys: B[]): [A, B][] => {
  if (xs.length === 0 || ys.length === 0) {
    return [];
  }
  const [x, ...xtail] = xs;
  const [y, ...ytail] = ys;
  return [[x, y] as [A, B]].concat(zip(xtail, ytail));
};
export default zip;
