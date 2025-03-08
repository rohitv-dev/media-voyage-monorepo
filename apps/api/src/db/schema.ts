import { boolean, date, index, integer, json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const statusTable = pgTable("statuses", {
  status: text().primaryKey(),
});

export const mediaTypeTable = pgTable("media_types", {
  type: text().primaryKey(),
});

export const mediaTable = pgTable("media", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  status: text()
    .references(() => statusTable.status)
    .notNull(),
  type: text()
    .references(() => mediaTypeTable.type)
    .notNull(),
  rating: integer(),
  createdOn: date().defaultNow(),
  updatedOn: date().defaultNow(),
  startDate: date(),
  completedDate: date(),
  recommended: boolean(),
  comments: text(),
  userId: integer().references(() => userTable.id),
  isPrivate: boolean().notNull().default(false),
});

export const userTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: text().notNull(),
  username: text().notNull(),
  password: text().notNull(),
  salt: text().notNull(),
  createdOn: date().defaultNow().notNull(),
  updatedOn: date().defaultNow().notNull(),
});

export const friendTable = pgTable("friends", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  requestor: integer().references(() => userTable.id),
  recepient: integer().references(() => userTable.id),
  status: text().notNull(),
  message: text(),
  createdOn: date().defaultNow().notNull(),
  updatedOn: date().defaultNow().notNull(),
});

export const sessionTable = pgTable(
  "session",
  {
    sid: varchar("sid").primaryKey(),
    sess: json("sess"),
    expire: timestamp("expire", { precision: 6 }),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

export const notificationTable = pgTable("notifications", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().references(() => userTable.id),
  type: text().notNull(),
  title: text().notNull(),
  message: text().notNull(),
  read: boolean().notNull().default(false),
  createdOn: date().defaultNow().notNull(),
  updatedOn: date().defaultNow().notNull(),
});

export type Media = typeof mediaTable.$inferSelect;
export type NewMedia = typeof mediaTable.$inferInsert;

export type User = typeof userTable.$inferSelect;
export type NewUser = typeof userTable.$inferInsert;

export type Friend = typeof friendTable.$inferSelect;
export type NewFriend = typeof friendTable.$inferInsert;
