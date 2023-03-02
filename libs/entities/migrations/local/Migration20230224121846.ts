import { Migration } from '@mikro-orm/migrations';

export class Migration20230224121846 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "role" text check ("role" in (\'user\', \'admin\')) not null, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index "user_name_index" on "user" ("name");');
    this.addSql('alter table "user" add constraint "user_name_unique" unique ("name");');

    this.addSql('create table "todo" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "name" varchar(255) not null, "role" text check ("role" in (\'user\', \'admin\')) not null, "user_id" varchar(255) not null, constraint "todo_pkey" primary key ("id"));');
    this.addSql('create index "todo_email_index" on "todo" ("email");');
    this.addSql('alter table "todo" add constraint "todo_email_unique" unique ("email");');

    this.addSql('alter table "todo" add constraint "todo_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "todo" drop constraint "todo_user_id_foreign";');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "todo" cascade;');
  }

}
