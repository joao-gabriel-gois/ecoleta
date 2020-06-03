import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

//Middlewares
app.use(cors());
app.use(express.json())
app.use(routes);

//Static
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

//Starting
console.log('Server is on')
app.listen(3333);
