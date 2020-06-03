import { Request, Response } from 'express';
import knex from '../database/connection';

export default class ItemsController {
   async index(request: Request, response: Response) {
      try {
         const items = await knex('items').select('*');

         const serializedItems = items.map(item => {
            return {
               id: item.id,
               image_url: `http://localhost:3333/uploads/${item.image}`,
               title: item.title,
            }
         });

         return response.json({
            get_success: true,
            data: serializedItems
         });

      } catch (error) {

         return response.status(404).json({
            get_success: false,
            message: 'Could not connect to DataBase',
            error,
         })
      }
   }
}