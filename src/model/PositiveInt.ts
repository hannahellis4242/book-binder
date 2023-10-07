import { z } from "zod";

export const PositiveIntSchema = z.number().positive().int();
type PositiveInt = z.infer<typeof PositiveIntSchema>;
export default PositiveInt;
