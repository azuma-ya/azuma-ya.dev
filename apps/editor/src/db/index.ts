import { type AnyD1Database, drizzle } from "drizzle-orm/d1";

export const db = drizzle((process.env as unknown as { DB: AnyD1Database }).DB);
