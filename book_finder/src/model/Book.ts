import { getPageCount } from "./pages";
import Signatures, { createSignatures } from "./Signatures";

export default interface Book {
  pages: number;
  signatures: Signatures;
}
