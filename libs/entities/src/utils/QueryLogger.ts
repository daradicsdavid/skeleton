import {Knex} from "@mikro-orm/postgresql";

export default function logQuery(raw: Knex.Raw) {
  const sql = raw.toSQL().toNative()

  let sqlString = sql.sql
  for (const [i, binding] of sql.bindings.entries()) {
    sqlString = sqlString.replace(`$${i + 1}`, binding.toString())
  }
  console.log(sqlString)
}
