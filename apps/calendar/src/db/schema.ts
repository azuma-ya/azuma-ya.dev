import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userInfos = sqliteTable("user_infos", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").unique().notNull(),
});
