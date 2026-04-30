ALTER TABLE "users_account" DROP CONSTRAINT "users_account_postcode_unique";--> statement-breakpoint
ALTER TABLE "users_account" DROP CONSTRAINT "users_account_city_unique";--> statement-breakpoint
ALTER TABLE "users_account" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users_account" ALTER COLUMN "postcode" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users_account" ALTER COLUMN "city" DROP NOT NULL;