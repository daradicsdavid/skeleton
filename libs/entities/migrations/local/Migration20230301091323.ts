import { Migration } from '@mikro-orm/migrations';

export class Migration20230301091323 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "todo" drop constraint "todo_user_id_foreign";');

    this.addSql('alter table "todo" alter column "user_id" type varchar(255) using ("user_id"::varchar(255));');
    this.addSql('alter table "todo" alter column "user_id" drop not null;');
    this.addSql('alter table "todo" add constraint "todo_user_id_foreign" foreign key ("user_id") references "user" ("id") on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "todo" drop constraint "todo_user_id_foreign";');

    this.addSql('alter table "todo" alter column "user_id" type varchar(255) using ("user_id"::varchar(255));');
    this.addSql('alter table "todo" alter column "user_id" set not null;');
    this.addSql('alter table "todo" add constraint "todo_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
