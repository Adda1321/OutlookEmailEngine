alter table "public"."linked_accounts"
  add constraint "linked_accounts_user_id_fkey"
  foreign key ("user_id")
  references "public"."users"
  ("uuid") on update restrict on delete restrict;
