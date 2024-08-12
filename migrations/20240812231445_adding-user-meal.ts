import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('diet_meal', (table) => {
    table.uuid('user_id').after('id').index()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('diet_meal', (table) => {
    table.dropColumn('user_id')
  })
}

