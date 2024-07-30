alter table "public"."linked_accounts" drop constraint "linked_accounts_pkey";
alter table "public"."linked_accounts"
    add constraint "linked_accounts_pkey"
    primary key ("id", "userId");
