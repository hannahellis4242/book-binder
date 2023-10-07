import { z } from "zod";
import { PositiveIntSchema } from "./PositiveInt";
import { SignatureListSchema } from "./SignatureFinder/SignatureList";

export const ReportSchema = z.object({
  pages: PositiveIntSchema,
  maxAllowed: PositiveIntSchema,
  sizes: z.array(PositiveIntSchema),
  signatureOptions: z.array(SignatureListSchema),
  selectedOption: SignatureListSchema,
  sequence: z.array(PositiveIntSchema),
  pageSequence: z.array(PositiveIntSchema),
  signaturePageSequence: z.array(z.array(PositiveIntSchema)),
});
type Report = z.infer<typeof ReportSchema>;
export default Report;
