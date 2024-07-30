CREATE TABLE "public"."linked_accounts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "accessToken" text NOT NULL, "accountEmail" text NOT NULL, "accountId" text NOT NULL, "createdAt" text NOT NULL, "userId" uuid NOT NULL, PRIMARY KEY ("id","userId") );COMMENT ON TABLE "public"."linked_accounts" IS E'Outlook linked Accounts';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
