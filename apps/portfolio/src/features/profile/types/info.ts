import { z } from "zod";

export const infoSchema = z.object({
  avatar: z.string(),
  name: z.string(),
  description: z.string(),
  socials: z.object({
    github: z.string(),
    x: z.string().optional(),
    linkedin: z.string().optional(),
  }),
});

export type Info = z.infer<typeof infoSchema>;
