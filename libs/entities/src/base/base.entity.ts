import {v4} from "uuid";
import {PrimaryKey, Property} from "@mikro-orm/core";
import {AutoMap} from "@automapper/classes";
import {BaseEntity as MikroOrmBaseEntity} from "@mikro-orm/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class BaseEntity<T extends { id: string }> extends MikroOrmBaseEntity<T, "id"> {
  @PrimaryKey()
  @AutoMap(() => String)
  id: string = v4();

  @Property()
  @AutoMap(() => Date)
  createdAt: Date = new Date();

  @Property({onUpdate: () => new Date()})
  @AutoMap(() => Date)
  updatedAt: Date = new Date();
}
