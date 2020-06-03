import Knex from 'knex';

export async function create(knex: Knex) {
   return knex.schema.createTable('items', table => {
      table.increments('id').primary();
      table.string('image').notNullable();
      table.string('title').notNullable();
   });
}

export async function drop(knex: Knex) {
   return knex.schema.dropTable('items');
}
