import { z } from "zod";

export const infoSchema = z.object({
  avatar: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  socials: z.object({
    github: z.string(),
    x: z.string().optional(),
    linkedin: z.string().optional(),
    email: z.string().optional(),
  }),
  portfolio: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
  }),
});

export type Info = z.infer<typeof infoSchema>;
