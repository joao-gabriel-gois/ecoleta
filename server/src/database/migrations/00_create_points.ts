import Knex from 'knex';

export async function create(knex: Knex) {
   return knex.schema.createTable('points', table => {
      table.increments('id').primary();
      table.string('image').notNullable();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.decimal('longitude').notNullable();
      table.decimal('latitude').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
   });
}

export async function drop(knex: Knex) {
   return knex.schema.dropTable('points');
}
