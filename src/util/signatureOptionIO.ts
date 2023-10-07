import SignatureList from "../model/SignatureFinder/SignatureList";
import SignatureListEntry from "../model/SignatureFinder/SignatureListEntry";

export const writeSignatureOption = (option: SignatureList): string =>
  option.signatures.map(({ size, count }) => `${size}:${count}`).join(",") +
  (option.pages ? `;${option.pages}` : "");

export const readSignatureOption = (encoded: string): SignatureList => {
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
