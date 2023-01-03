import uniq from "../src/utils/uniq";

describe("uniq", () => {
  describe("when given the array [3,5,4,3]", () => {
    const input = [3, 5, 4, 3];
    const sorted = input.sort();
    const result = uniq(sorted);
    test("should give a result with 3 enties", () =>
      expect(result).toHaveLength(3));
    test("and should be equal to [3,4,5]", () =>
      expect(result).toStrictEqual([3, 4, 5]));
  });
});

describe("array of arrays", () => {
  type Arr = [number, number];
  const xs: Arr[] = [
    [1, 1],
    [0, 1],
    [1, 2],
    [0, 0],
    [2, 1],
    [0, 1],
    [2, 2],
    [1, 1],
  ];
  const result = uniq(
    xs.sort(),
    ([a, b]: Arr, [c, d]: Arr) => a === c && b === d
  );
  test("should give 6 unique elements", () => expect(result).toHaveLength(6));
  test("and should be exactly equal to", () =>
    expect(result).toStrictEqual([
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
    ]));
});
