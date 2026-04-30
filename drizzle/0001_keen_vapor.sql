CREATE TABLE "users_account" (
	"id" serial PRIMARY KEY NOT NULL,
	"users_id" integer,
	"surname" text NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"postcode" text NOT NULL,
	"city" text NOT NULL,
	CONSTRAINT "users_account_surname_unique" UNIQUE("surname"),
	CONSTRAINT "users_account_name_unique" UNIQUE("name"),
	CONSTRAINT "users_account_phone_unique" UNIQUE("phone"),
	CONSTRAINT "users_account_postcode_unique" UNIQUE("postcode"),
	CONSTRAINT "users_account_city_unique" UNIQUE("city")
);
--> statement-breakpoint
ALTER TABLE "users_account" ADD CONSTRAINT "users_account_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;