import { z } from "zod";

import { dateSchema } from "@/schema/date";

export const workSchema = z.object({
  title: z.string(),
  createdAt: dateSchema,
  updatedAt: dateSchema.optional(),
  description: z.string(),
  tags: z.array(z.string()),
  url: z.string(),
  isPinned: z.boolean().default(false),
  slug: z.string(),
  content: z.string(),
  type: z.literal("Work"),
});

export type Work = z.infer<typeof workSchema>;
