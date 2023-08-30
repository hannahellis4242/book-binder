import SignatureList, {
  SignatureListEntry,
} from "./model/SignatureFinder/SignatureList";

export const encodeSignatureOption = (option: SignatureList): string =>
  option.signatures.map(({ size, count }) => `${size}:${count}`).join(",") +
  (option.pages ? `;${option.pages}` : "");

export const decodeSignatureOption = (encoded: string): SignatureList => {
  const [entries, pages] = encoded.split(";");
  const sizes = entries.split(",");
  const signatures = sizes
    .map((x) => x.split(":"))
    .map(([size, count]) => [Number.parseInt(size), parseInt(count)])
    .map(([size, count]) => ({ size, count } as SignatureListEntry));
  if (!pages) {
    return { signatures };
  }
  return { signatures, pages: Number.parseInt(pages) };
};
