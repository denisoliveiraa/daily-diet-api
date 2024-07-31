import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('diet_meal', (table) => {
    table.uuid('id').primary()
    table.text('diet_id').unsigned().notNullable()
    table.text('meal_id').unsigned().notNullable()
    table.foreign('diet_id').references('id').inTable('diet')
    table.foreign('diet_id').references('id').inTable('meal')
    table.text('name').notNullable()
    table.text('description')
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('diet_meal')
}