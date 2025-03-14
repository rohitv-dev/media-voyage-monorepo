import { z } from "zod";

export const MediaStatusEnum = z.enum(["Completed", "In Progress", "Planned", "Dropped"]);
export type MediaStatus = z.infer<typeof MediaStatusEnum>;

export const MediaTypeEnum = z.enum(["Movie", "Show", "Game", "Book"]);
export type MediaType = z.infer<typeof MediaTypeEnum>;

const mediaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  startDate: z.date().optional(),
  completedDate: z.date().optional(),
  comments: z.string().optional(),
  rating: z.number().optional(),
  genre: z.string().optional(),
  platform: z.string().optional(),
  type: MediaTypeEnum,
  recommended: z.boolean().optional(),
  status: MediaStatusEnum,
});

export const addMediaSchema = mediaSchema;

export const updateMediaSchema = mediaSchema.extend({
  id: z.number(),
});

export interface AddMediaSchema extends z.infer<typeof addMediaSchema> {}
export interface UpdateMediaSchema extends z.infer<typeof updateMediaSchema> {}
