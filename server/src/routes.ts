import express from 'express';
import { celebrate } from 'celebrate';
import options from './validator-schema';

import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const upload = multer(multerConfig);

const routes = express.Router();

const [ schema, abortOpt ] = options;

const pointsController = new PointsController();
const itemsController = new ItemsController();


routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post('/points', upload.single('image'), celebrate(schema, abortOpt), pointsController.create)

export default routes;
