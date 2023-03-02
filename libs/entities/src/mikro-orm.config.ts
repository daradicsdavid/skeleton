import {Logger} from "@nestjs/common";
import {Options} from "@mikro-orm/core";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import User from "./user/user.entity";
import Todo from "./todo/todo.entity";


const logger = new Logger("MikroORM");

const config: Options<PostgreSqlDriver> = {
  dbName: process.env.DB_NAME,
  type: "postgresql",
  host: process.env.DB_HOST,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  port: parseInt(process.env.DB_PORT!),
  debug: process.env.ENVIRONMENT === "local",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logger: logger.log.bind(logger),
  entities: [
    User,
    Todo
  ],
  schema: "public",
  migrations: {path: `migrations/${process.env.ENVIRONMENT}`},
  seeder: {
    path: "src/utils/seeders", // path to the folder with seeders
    pathTs: "src/utils/seeders", // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: "DatabaseSeeder", // default seeder class name
    glob: "!(*.d).{js,ts}", // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: "ts", // seeder generation mode
    fileName: (className: string) => className // seeder file naming convention
  }
};

export default config;
