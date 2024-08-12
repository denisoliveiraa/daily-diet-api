import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.table('diet_meal', (table) => {
    table.dropColumn('name');
    table.dropColumn('description'); 
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('diet_meal', (table) => {
    table.string('name'); 
    table.string('description'); 
  });
}

