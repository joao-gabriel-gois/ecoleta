import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

//Middlewares
app.use(routes);
app.use(express.json())

//Static
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

//Starting
console.log('Server is on')
app.listen(3333);
