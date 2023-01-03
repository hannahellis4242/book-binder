import grow from "../src/solver/grow";

describe("grow", () => {
  describe("when given a one dimensional point [5]", () => {
    const input = [5];
    const condition = (_: number[]) => true;
    const result = grow(input);
    test("should give two values", () => expect(result).toHaveLength(2));
    test("and the first value is [6]", () =>
      expect(result[0]).toStrictEqual([6]));
    test("and the second value is [4]", () =>
      expect(result[1]).toStrictEqual([4]));
  });
  describe("when given a two dimensional point [0,0]", () => {
    const input = [0, 0];
    const result = grow(input);
    test("should give four values", () => expect(result).toHaveLength(4));
    test("and the first value is [1,0]", () =>
      expect(result[0]).toStrictEqual([1, 0]));
    test("and the second value is [0,1]", () =>
      expect(result[1]).toStrictEqual([0, 1]));
    test("and the third value is [-1,0]", () =>
      expect(result[2]).toStrictEqual([-1, 0]));
    test("and the fourth value is [0,-1]", () =>
      expect(result[3]).toStrictEqual([0, -1]));
  });
});
