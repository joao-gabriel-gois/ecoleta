import { Request, Response } from 'express';
import knex from '../database/connection';

export default class PointsController {
   async index(request: Request, response: Response) {
      const { city, uf, items } = request.query;

      const parsedItems = String(items)
         .split(',')
         .map(item => Number(item.trim()));

      try {
         const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*'); // return points, but knows which items to filter by joining point_items that has items info

         return response.json(points);

      } catch (error) {
         console.log(error);

         return response.status(404).json({
            error,
            message: 'Could not connect to DataBase',
         })
      }
   }



   async show(request: Request, response: Response) {
      const { id } = request.params;

      try {
         const point = await knex('points').where('id', id).first();

         if (!point) {
            return response.status(400).json({
               message: "Bad Request: Database was reached, but point wasn't found",
            })
         }

         /*
            SELECT * FROM items JOIN point_items ON items.id = point_items.item_id WHERE point_items.point_id = ${request.params.id}
            // in knex, it becomes:
         */
         const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', '=', id)
            .select('items.title');

         return response.json({
            point, items
         })

      } catch (error) {

         return response.status(404).json({
            error,
            message: 'Could not connect to DataBase'
         })
      }
   }


   async create(request: Request, response: Response) {
      const {
         name,
         email,
         whatsapp,
         latitude,
         longitude,
         city,
         uf,
         items
      } = request.body;

      try {
         const trx = await knex.transaction(); //To guarantee that data will only be inserted if all queries are successful

         const point = {
            image: 'image-fake', //only while upload is not implemented
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
         };

         const insertedPointIds = await trx('points').insert(point);

         const point_id = insertedPointIds[0];

         const pointItems = items.map((item_id: number) => {
            return {
               item_id,
               point_id
            }
         })

         await trx('point_items').insert(pointItems);

         await trx.commit(); // used to finish transaction

         return response.json({
            point_id,
            ...point
         });

      } catch (error) {

         return response.status(404).json({
            error,
            message: "Could not connect to DataBase"
         })
      }
   }

}
