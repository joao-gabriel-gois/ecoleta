import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();


routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points', pointsController.show);
routes.post('/points/:id', pointsController.create)

export default routes;
