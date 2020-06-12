import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

//Middlewares
app.use(cors());
app.use(express.json())
app.use(routes);
app.use(errors());

//Static
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use('/uploads/points', express.static(path.resolve(__dirname, '..', 'uploads', 'uploaded_points')))

//Starting
console.log('Server is on')
app.listen(3333);
