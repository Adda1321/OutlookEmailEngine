CREATE TABLE "public"."users" ("uuid" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "user_name" text NOT NULL, PRIMARY KEY ("uuid") );COMMENT ON TABLE "public"."users" IS E'details for app user';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
