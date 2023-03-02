import { Migration } from '@mikro-orm/migrations';

export class Migration20230301125912 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "todo" drop constraint "todo_user_id_foreign";');

    this.addSql('alter table "todo" add constraint "todo_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "todo" drop constraint "todo_user_id_foreign";');

    this.addSql('alter table "todo" add constraint "todo_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
