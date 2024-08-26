import { z } from "zod";

export const schema = z.object({
  id: z.string().length(36, "ID cannot be blank"),
});
