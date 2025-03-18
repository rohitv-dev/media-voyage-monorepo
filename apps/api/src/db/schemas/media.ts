import { boolean, integer, pgPolicy, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { timestamps } from "../helpers/columns";

export const statusTable = pgTable("status", {
  status: text().primaryKey(),
});

export const mediaTypeTable = pgTable("media_type", {
  type: text().primaryKey(),
});

export const mediaTable = pgTable("media", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  title: text().notNull(),
  status: text()
    .references(() => statusTable.status)
    .notNull(),
  type: text()
    .references(() => mediaTypeTable.type)
    .notNull(),
  genre: text(),
  rating: integer(),
  startDate: timestamp({ mode: "date" }),
  completedDate: timestamp({ mode: "date" }),
  recommended: boolean(),
  comments: text().default(""),
  platform: text(),
  userId: text().references(() => user.id),
  isPrivate: boolean().default(false).notNull(),
  ...timestamps,
});

export const updateMediaSchema = createUpdateSchema(mediaTable);

export interface UpdateMediaSchema extends z.infer<typeof updateMediaSchema> {}

export type Media = typeof mediaTable.$inferSelect;
export type NewMedia = typeof mediaTable.$inferInsert;
