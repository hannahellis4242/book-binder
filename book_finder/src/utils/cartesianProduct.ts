const cartProd2 =
  <A>(xs: A[]) =>
  <B>(ys: B[]): [A, B][] =>
    xs.flatMap<[A, B]>((x: A) => ys.map<[A, B]>((y: B) => [x, y]));
const cartesianProduct = (xs: any[][]) =>
  xs.reduce((x: any, y: any) =>
    cartProd2(x)(y).map((xs) => xs.flatMap((x: any) => x))
  );

export default cartesianProduct;
