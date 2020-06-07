import { Request, Response } from 'express';
import knex from '../database/connection';

export default class ItemsController {
   async index(request: Request, response: Response) {
      try {
         const items = await knex('items').select('*');

         const serializedItems = items.map(item => {
            return {
               id: item.id,
               image_url: `http://192.168.1.121:3333/uploads/${item.image}`,
               title: item.title,
            }
         });

         return response.json(serializedItems);

      } catch (error) {

         return response.status(404).json({
            error,
            message: 'Could not connect to DataBase',
         })
      }
   }
}