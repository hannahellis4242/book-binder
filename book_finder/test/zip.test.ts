import zip from "../src/utils/zip";

describe("zip", () => {
  describe("zip two empty lists", () => {
    const x: number[] = [];
    const y: string[] = [];
    const z = zip(x, y);
    test("should give empty list", () => expect(z).toHaveLength(0));
  });
  describe("zip two lists each with one item in them", () => {
    const x = [3];
    const y = ["Hello"];
    const z = zip(x, y);
    test("should give a list with one entry", () => expect(z).toHaveLength(1));
    test('and that entry should be [3,"Hello"]', () =>
      expect(z[0]).toStrictEqual([3, "Hello"]));
  });
  describe("zip two lists, each with two items in them", () => {
    const x = ["x", "y"];
    const y = [true, false];
    const z = zip(x, y);
    test("should give a list with two entrys", () => expect(z).toHaveLength(2));
    test('and the first entry should be ["x",true]', () =>
      expect(z[0]).toStrictEqual(["x", true]));
    test('and the second entry should be ["y",false]', () =>
      expect(z[1]).toStrictEqual(["y", false]));
  });
  describe("zip two lists, one with two items and one with four items", () => {
    const x = ["apple", "banana", "cherry", "date"];
    const y = [4, 2];
    const z = zip(x, y);
    test("should give a list with two entrys", () => expect(z).toHaveLength(2));
    test('and the first entry should be ["apple",4]', () =>
      expect(z[0]).toStrictEqual(["apple", 4]));
    test('and the second entry should be ["banana",2]', () =>
      expect(z[1]).toStrictEqual(["banana", 2]));
  });
});
