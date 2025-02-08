import { z } from "zod";

export const profileSchema = z.object({
  avatar: z.string(),
  name: z.string(),
  description: z.string(),
  socials: z.object({
    github: z.string(),
    x: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  content: z.string(),
});

export type Profile = z.infer<typeof profileSchema>;
