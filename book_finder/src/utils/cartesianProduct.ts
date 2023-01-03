export const cartesianProduct2 = <A, B>(a: A[], b: B[]): [A, B][] =>
  a.flatMap((x) => b.map((y) => [x, y] as [A, B]));

const flat21 = <A, B, C>([[a, b], c]: [[A, B], C]): [A, B, C] => {
  return [a, b, c];
};

export const cartesianProduct3 = <A, B, C>(
  a: A[],
  b: B[],
  c: C[]
): [A, B, C][] => cartesianProduct2(cartesianProduct2(a, b), c).map(flat21);

const flat31 = <A, B, C, D>([[a, b, c], d]: [[A, B, C], D]): [A, B, C, D] => {
  return [a, b, c, d];
};
export const cartesianProduct4 = <A, B, C, D>(
  a: A[],
  b: B[],
  c: C[],
  d: D[]
): [A, B, C, D][] =>
  cartesianProduct2(
    cartesianProduct2(cartesianProduct2(a, b), c).map(flat21),
    d
  ).map(flat31);
