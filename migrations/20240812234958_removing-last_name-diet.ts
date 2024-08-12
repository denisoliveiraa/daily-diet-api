import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.table('diet', (table) => {
    table.dropColumn('last_name');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('diet', (table) => {
    table.string('last_name'); 
  });
}

