const cartesianProduct2 = <A, B>(a: A[], b: B[]): [A, B][] =>
  a.flatMap((x) => b.map((y) => [x, y] as [A, B]));

const flat21 = <A, B, C>([[a, b], c]: [[A, B], C]): [A, B, C] => {
  return [a, b, c];
};

const cartesianProduct3 = <A, B, C>(a: A[], b: B[], c: C[]): [A, B, C][] =>
  cartesianProduct2(cartesianProduct2(a, b), c).map(flat21);
const flat31 = <A, B, C, D>([[a, b, c], d]: [[A, B, C], D]): [A, B, C, D] => {
  return [a, b, c, d];
};
const cartesianProduct4 = <A, B, C, D>(
  a: A[],
  b: B[],
  c: C[],
  d: D[]
): [A, B, C, D][] =>
  cartesianProduct2(
    cartesianProduct2(cartesianProduct2(a, b), c).map(flat21),
    d
  ).map(flat31);

describe("carteasian product", () => {
  describe("two empty arrays", () => {
    const result = cartesianProduct2([], []);
    test("should give empty array", () => expect(result).toHaveLength(0));
  });
  describe("two arrays with one item each", () => {
    const result = cartesianProduct2([1], ["a"]);
    test("should give array with one element", () =>
      expect(result).toHaveLength(1));
    test('and the element should be [1,"a"]', () => {
      expect(result[0]).toStrictEqual([1, "a"]);
    });
  });
  describe("two arrays with two items each", () => {
    const result = cartesianProduct2([1, 2], ["a", "b"]);
    console.log(JSON.stringify(result));
    test("should give array with one element", () =>
      expect(result).toHaveLength(4));
    test('and the elements should be [1,"a"],[1,"b"],[2,"a"]and[2,"b"]', () => {
      expect(result).toStrictEqual([
        [1, "a"],
        [1, "b"],
        [2, "a"],
        [2, "b"],
      ]);
    });
  });
});
