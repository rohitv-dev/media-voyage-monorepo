import { boolean, date, index, integer, json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const statusTable = pgTable("status", {
  status: text().primaryKey(),
});

export const mediaTypeTable = pgTable("media_type", {
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
  genre: text(),
  rating: integer(),
  createdOn: date().defaultNow(),
  updatedOn: date().defaultNow(),
  startDate: date(),
  completedDate: date(),
  recommended: boolean(),
  comments: text(),
  platform: text(),
  userId: text().references(() => user.id),
  isPrivate: boolean().notNull().default(false),
});

// export const userTable = pgTable("users", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   email: text().notNull(),
//   username: text().notNull(),
//   password: text().notNull(),
//   salt: text().notNull(),
//   createdOn: date().defaultNow().notNull(),
//   updatedOn: date().defaultNow().notNull(),
// });

export const friendTable = pgTable("friend", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  requestor: text().references(() => user.id),
  recepient: text().references(() => user.id),
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

export const notificationTable = pgTable("notification", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text().references(() => user.id),
  type: text().notNull(),
  title: text().notNull(),
  message: text().notNull(),
  read: boolean().notNull().default(false),
  createdOn: date().defaultNow().notNull(),
  updatedOn: date().defaultNow().notNull(),
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export type Media = typeof mediaTable.$inferSelect;
export type NewMedia = typeof mediaTable.$inferInsert;

// export type User = typeof userTable.$inferSelect;
// export type NewUser = typeof userTable.$inferInsert;

export type Friend = typeof friendTable.$inferSelect;
export type NewFriend = typeof friendTable.$inferInsert;
