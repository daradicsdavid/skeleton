import { Migration } from '@mikro-orm/migrations';

export class Migration20230301085743 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "todo" add column "title" varchar(255) not null;');
    this.addSql('drop index "todo_email_index";');
    this.addSql('alter table "todo" drop constraint "todo_email_unique";');
    this.addSql('alter table "todo" drop column "email";');
    this.addSql('alter table "todo" drop column "name";');
    this.addSql('alter table "todo" drop column "role";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "todo" add column "name" varchar(255) not null, add column "role" text check ("role" in (\'user\', \'admin\')) not null;');
    this.addSql('alter table "todo" rename column "title" to "email";');
    this.addSql('create index "todo_email_index" on "todo" ("email");');
    this.addSql('alter table "todo" add constraint "todo_email_unique" unique ("email");');
  }

}
