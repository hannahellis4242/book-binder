import { z } from "zod";
import { SignatureListEntrySchema } from "./SignatureListEntry";
import { PositiveIntSchema } from "../PositiveInt";

export const SignatureListSchema = z.object({
  signatures: z.array(SignatureListEntrySchema),
  pages: PositiveIntSchema.optional(),
});
type SignatureList = z.infer<typeof SignatureListSchema>;
export default SignatureList;
