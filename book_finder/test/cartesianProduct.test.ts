import cartesianProduct from "../src/utils/cartesianProduct";

describe("carteasian product", () => {
  describe("two empty arrays", () => {
    const result = cartesianProduct([[], []]);
    test("should give empty array", () => expect(result).toHaveLength(0));
  });
  describe("two arrays with one item each", () => {
    const result = cartesianProduct([[1], ["a"]]);
    test("should give array with one element", () =>
      expect(result).toHaveLength(1));
    test('and the element should be [1,"a"]', () => {
      expect(result[0]).toStrictEqual([1, "a"]);
    });
  });
  describe("two arrays with two items each", () => {
    const result = cartesianProduct([
      [1, 2],
      ["a", "b"],
    ]);
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
  describe("three arrays", () => {
    const result = cartesianProduct([[1], ["a", "b"], [true, false]]);
    test("should give array with four elements", () =>
      expect(result).toHaveLength(4));
    test('and the elements should be [1,"a",true],[1,"a",false],[1,"b",true]and[1,"b",false]', () => {
      expect(result).toStrictEqual([
        [1, "a", true],
        [1, "a", false],
        [1, "b", true],
        [1, "b", false],
      ]);
    });
  });
  describe("three arrays again", () => {
    const result = cartesianProduct([
      [1, 2],
      ["a", "b"],
      [true, false],
    ]);
    test("should give array with eight elements", () =>
      expect(result).toHaveLength(8));
    test("and the elements are", () => {
      expect(result).toStrictEqual([
        [1, "a", true],
        [1, "a", false],
        [1, "b", true],
        [1, "b", false],
        [2, "a", true],
        [2, "a", false],
        [2, "b", true],
        [2, "b", false],
      ]);
    });
  });
  describe("four arrays", () => {
    const result = cartesianProduct([
      [1, 2],
      [3, 4, 5],
      [6, 7, 8, 9],
      [10, 11, 12, 13, 14],
    ]);
    test("should give array with length", () =>
      expect(result).toHaveLength(5 * 4 * 3 * 2));
    console.log(JSON.stringify(result));
    test("and the elements are", () => {
      expect(result).toStrictEqual([
        [1, 3, 6, 10],
        [1, 3, 6, 11],
        [1, 3, 6, 12],
        [1, 3, 6, 13],
        [1, 3, 6, 14],
        [1, 3, 7, 10],
        [1, 3, 7, 11],
        [1, 3, 7, 12],
        [1, 3, 7, 13],
        [1, 3, 7, 14],
        [1, 3, 8, 10],
        [1, 3, 8, 11],
        [1, 3, 8, 12],
        [1, 3, 8, 13],
        [1, 3, 8, 14],
        [1, 3, 9, 10],
        [1, 3, 9, 11],
        [1, 3, 9, 12],
        [1, 3, 9, 13],
        [1, 3, 9, 14],
        [1, 4, 6, 10],
        [1, 4, 6, 11],
        [1, 4, 6, 12],
        [1, 4, 6, 13],
        [1, 4, 6, 14],
        [1, 4, 7, 10],
        [1, 4, 7, 11],
        [1, 4, 7, 12],
        [1, 4, 7, 13],
        [1, 4, 7, 14],
        [1, 4, 8, 10],
        [1, 4, 8, 11],
        [1, 4, 8, 12],
        [1, 4, 8, 13],
        [1, 4, 8, 14],
        [1, 4, 9, 10],
        [1, 4, 9, 11],
        [1, 4, 9, 12],
        [1, 4, 9, 13],
        [1, 4, 9, 14],
        [1, 5, 6, 10],
        [1, 5, 6, 11],
        [1, 5, 6, 12],
        [1, 5, 6, 13],
        [1, 5, 6, 14],
        [1, 5, 7, 10],
        [1, 5, 7, 11],
        [1, 5, 7, 12],
        [1, 5, 7, 13],
        [1, 5, 7, 14],
        [1, 5, 8, 10],
        [1, 5, 8, 11],
        [1, 5, 8, 12],
        [1, 5, 8, 13],
        [1, 5, 8, 14],
        [1, 5, 9, 10],
        [1, 5, 9, 11],
        [1, 5, 9, 12],
        [1, 5, 9, 13],
        [1, 5, 9, 14],
        [2, 3, 6, 10],
        [2, 3, 6, 11],
        [2, 3, 6, 12],
        [2, 3, 6, 13],
        [2, 3, 6, 14],
        [2, 3, 7, 10],
        [2, 3, 7, 11],
        [2, 3, 7, 12],
        [2, 3, 7, 13],
        [2, 3, 7, 14],
        [2, 3, 8, 10],
        [2, 3, 8, 11],
        [2, 3, 8, 12],
        [2, 3, 8, 13],
        [2, 3, 8, 14],
        [2, 3, 9, 10],
        [2, 3, 9, 11],
        [2, 3, 9, 12],
        [2, 3, 9, 13],
        [2, 3, 9, 14],
        [2, 4, 6, 10],
        [2, 4, 6, 11],
        [2, 4, 6, 12],
        [2, 4, 6, 13],
        [2, 4, 6, 14],
        [2, 4, 7, 10],
        [2, 4, 7, 11],
        [2, 4, 7, 12],
        [2, 4, 7, 13],
        [2, 4, 7, 14],
        [2, 4, 8, 10],
        [2, 4, 8, 11],
        [2, 4, 8, 12],
        [2, 4, 8, 13],
        [2, 4, 8, 14],
        [2, 4, 9, 10],
        [2, 4, 9, 11],
        [2, 4, 9, 12],
        [2, 4, 9, 13],
        [2, 4, 9, 14],
        [2, 5, 6, 10],
        [2, 5, 6, 11],
        [2, 5, 6, 12],
        [2, 5, 6, 13],
        [2, 5, 6, 14],
        [2, 5, 7, 10],
        [2, 5, 7, 11],
        [2, 5, 7, 12],
        [2, 5, 7, 13],
        [2, 5, 7, 14],
        [2, 5, 8, 10],
        [2, 5, 8, 11],
        [2, 5, 8, 12],
        [2, 5, 8, 13],
        [2, 5, 8, 14],
        [2, 5, 9, 10],
        [2, 5, 9, 11],
        [2, 5, 9, 12],
        [2, 5, 9, 13],
        [2, 5, 9, 14],
      ]);
    });
  });
});
