alter table "public"."users" alter column "uuid" set default gen_random_uuid();
ALTER TABLE "public"."users" ALTER COLUMN "uuid" TYPE uuid;
