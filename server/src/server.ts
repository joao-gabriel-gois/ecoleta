import express from 'express';
import routes from './routes';

const app = express();

//Middlewares
app.use(routes);
app.use(express.json())

//Starting
app.listen(3333);
