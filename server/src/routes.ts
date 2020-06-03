import express from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
   const items = await knex('items').select('*');

   const serializedItems = items.map(item => {
      return {
         id: item.id,
         image_url: `http://localhost:3333/uploads/${item.image}`,
         title: item.title,
      }
   });

   return response.json(serializedItems);
})

export default routes;
