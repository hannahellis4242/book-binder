import solve from "../src/solver/solve";

describe("when looking for a book with 12 pages", () => {
  describe("and only allowing 3 page signatures", () => {
    const signatures = solve(12, 12, [3]);
    test("should get just one solution", () =>
      expect(signatures).toHaveLength(1));
    const solution = signatures[0];
    test("should have a single signature of 3 pages", () =>
      expect(solution[3]).toBe(1));
  });
});

describe("when looking for a book with 13 pages", () => {
  describe("and only allowing 3 page signatures", () => {
    const signatures = solve(13, 13, [3]);
    test("should get no solutions", () => expect(signatures).toHaveLength(0));
  });
});

describe("when looking for a book with 13 pages", () => {
  describe("and only allowing 3 and 4 page signatures", () => {
    const signatures = solve(13, 16, [3, 4]);
    test("should get one solutions", () => expect(signatures).toHaveLength(1));
    const solution = signatures[0];
    test("should have a single signature of 4 pages", () =>
      expect(solution[4]).toBe(1));
  });
});

describe("when looking for a book with 28 pages", () => {
  describe("and only allowing 3 and 4 page signatures", () => {
    const signatures = solve(28, 32, [3, 4]);
    test("should get two solutions", () => expect(signatures).toHaveLength(2));
    describe("first solution", () => {
      const solution = signatures[0];
      test("should have one signatures of 3 pages", () =>
        expect(solution[3]).toBe(1));
      test("and should have one signatures of 4 pages", () =>
        expect(solution[4]).toBe(1));
    });
    describe("second solution", () => {
      const solution = signatures[1];
      test("should have two signatures of 4 pages", () =>
        expect(solution[4]).toBe(2));
    });
  });
});
/*
describe("when looking for a book with 28 pages", () => {
  describe("and only allowing 3, 4 and 5 page signatures", () => {
    const signatures = solve(28, [3, 5, 4, 3]);
    console.log(JSON.stringify(signatures, null, 2));
    test("should get two solutions", () => expect(signatures).toHaveLength(2));
    describe("first solution", () => {
      const solution = signatures[0];
      test("should have one signatures of 3 pages", () =>
        expect(solution[3]).toBe(1));
      test("and should have one signatures of 4 pages", () =>
        expect(solution[4]).toBe(1));
    });
    describe("second solution", () => {
      const solution = signatures[1];
      test("should have two signatures of 4 pages", () =>
        expect(solution[4]).toBe(2));
    });
  });
});
*/
