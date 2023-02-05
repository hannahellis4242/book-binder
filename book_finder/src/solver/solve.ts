import uniq from "../utils/uniq";
import cartesianProduct from "../utils/cartesianProduct";
import zip from "../utils/zip";
import Book from "./Book";

const getMaximums = (allowed: number[], maxPages: number) =>
  allowed.map((a) => Math.ceil(maxPages / (4 * a)));

const range = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => i);

const numberOfPages = (allowed: number[], point: number[]): number =>
  4 *
  zip(allowed, point)
    .map(([x, y]) => x * y)
    .reduce((acc, x) => acc + x, 0);

const isSolution =
  (target: number, max: number, allowed: number[]) =>
  (point: number[]): boolean => {
    const pages = numberOfPages(allowed, point);
    return pages >= target && pages <= max;
  };

const byNumberOfPages = (a: Book, b: Book) => a.getPages() - b.getPages();

const solve = (
  target: number,
  max: number,
  allowedPagesPerSignature: number[]
): Book[] => {
  if (target > max) {
    return [];
  }
  const allowed = uniq(allowedPagesPerSignature.sort());
  console.log("allowed", allowed);
  return cartesianProduct(getMaximums(allowed, max).map((n) => range(n)))
    .filter(isSolution(target, max, allowed))
    .map((solution) => new Book(allowed, solution))
    .sort(byNumberOfPages);
};

export default solve;
