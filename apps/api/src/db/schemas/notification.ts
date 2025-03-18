import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { timestamps } from "../helpers/columns";

export const notificationTable = pgTable("notification", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  userId: text().references(() => user.id),
  type: text().notNull(),
  title: text().notNull(),
  message: text().notNull(),
  read: boolean().notNull().default(false),
  ...timestamps,
});
