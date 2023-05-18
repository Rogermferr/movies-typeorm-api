import express, { Application } from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import { handleErrors } from './error';
import movieRoutes from './routes/movies.routes';

const app: Application = express();

app.use(express.json());

app.use('/movies', movieRoutes);

app.use(handleErrors);

export default app;
