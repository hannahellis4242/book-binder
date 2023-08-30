export default interface Problem {
  minimum: number;
  maximum: number;
  sizes: number[];
  format: "json" | "text";
  pageCount: boolean;
}
