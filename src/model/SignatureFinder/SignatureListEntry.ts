import { z } from "zod";
import { PositiveIntSchema } from "../PositiveInt";

export const SignatureListEntrySchema = z.object({
  size: PositiveIntSchema,
  count: PositiveIntSchema,
});
type SignatureListEntry = z.infer<typeof SignatureListEntrySchema>;
export default SignatureListEntry;
