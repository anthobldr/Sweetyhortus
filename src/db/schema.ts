import { numeric, varchar, text, pgTable, serial } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey().notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
});