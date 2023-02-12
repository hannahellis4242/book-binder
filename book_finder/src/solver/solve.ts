import uniq from "../utils/uniq";
import cartesianProduct from "../utils/cartesianProduct";
import Book from "../model/Book";
import { createSignatures } from "../model/Signatures";
import axios from "axios";

const bookServiceName = process.env.BOOK_HOST || "localhost";
const bookServicePort = process.env.BOOK_PORT || "5000";

const getMaximums = (allowed: number[], maxPages: number) =>
  allowed.map((a) => Math.ceil(maxPages / (4 * a)));

const range = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => i);

const byNumberOfPages = (a: Book, b: Book) => a.pages - b.pages;

const populate = async (max: number, allowed: number[]) => {
  await cartesianProduct(
    getMaximums(allowed, max).map((n) => range(n))
  ).forEach(async (point) => {
    const signatures = createSignatures(allowed, point);
    console.log("---------------------------------------");
    console.log(signatures);
    await axios
      .post(
        `http://${bookServiceName}:${bookServicePort}/`,
        {
          signatures,
        },
        { timeout: 60000 }
      )
      .catch(() => {});
    console.log("=======================================");
  });
};

const findSolutions = async (target: number, max: number) => {
  const results = await axios.get(
    `http://${bookServiceName}:${bookServicePort}/pages`,
    { params: { min: target, max } }
  );
  const books = results.data
    .map((x: Book) => {
      return { signatures: x.signatures, pages: x.pages };
    })
    .sort(byNumberOfPages);
  return books;
};

const solve = async (
  target: number,
  max: number,
  allowedPagesPerSignature: number[]
) => {
  if (target > max) {
    return;
  }
  const allowed = uniq(allowedPagesPerSignature.sort());
  await populate(max, allowed);
  return findSolutions(target, max);
};

export default solve;
