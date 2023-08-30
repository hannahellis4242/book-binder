export interface SignatureListEntry {
  size: number;
  count: number;
}

export default interface SignatureList {
  signatures: SignatureListEntry[];
  pages?: number;
}
