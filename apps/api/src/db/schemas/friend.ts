import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { timestamps } from "../helpers/columns";

export const friendTable = pgTable("friend", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  requestor: text().references(() => user.id),
  recepient: text().references(() => user.id),
  status: text().notNull(),
  message: text(),
  ...timestamps,
});
