import { z } from "zod";

export const createRoadmapSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100),

  description: z
    .string()
    .max(500)
    .optional(),
});