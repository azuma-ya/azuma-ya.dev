import { dateSchema } from "@/schema/date";
import { z } from "zod";

export const bookSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  url: z.string(),
  image: z.string().optional(),
  publishedAt: dateSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema.optional(),
  tags: z.array(z.string()),
  slug: z.string().transform((slug) => slug.replace(/\s+/g, "-")),
  content: z.string(),
  author: z.string(),
});

export type Book = z.infer<typeof bookSchema>;
