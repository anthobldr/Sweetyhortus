import { numeric, integer, varchar, text, pgTable, serial } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey().notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
});

export const users_account = pgTable("users_account", {
    id: serial("id").primaryKey().notNull(),
    users_id: integer("users_id").references(() => users.id),
    surname: text("surname").notNull().unique(),
    name: text("name").notNull().unique(),
    phone: text("phone").unique(),
    adress: text("adress"),
    postcode: text("postcode"),
    city: text("city"),
})