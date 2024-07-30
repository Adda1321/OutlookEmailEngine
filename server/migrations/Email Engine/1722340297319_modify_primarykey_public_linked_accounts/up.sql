BEGIN TRANSACTION;
ALTER TABLE "public"."linked_accounts" DROP CONSTRAINT "linked_accounts_pkey";

ALTER TABLE "public"."linked_accounts"
    ADD CONSTRAINT "linked_accounts_pkey" PRIMARY KEY ("id");
COMMIT TRANSACTION;
