import { Router } from 'express';
import ensureBodyIsValidMiddleware from '../middlewares/ensureBodyIsValid.middleware';
import {
  movieSchemaRequest,
  moviesSchemaUpdateRequest,
} from '../schemas/movies.schemas';
import {
  createMoviesController,
  deleteMoviesController,
  getMoviesController,
  updateMoviesController,
} from '../controllers/movies.controllers';
import ensureNameExistsMiddleware from '../middlewares/ensureNameExists.middleware';
import ensureIdExistsMiddleware from '../middlewares/ensureIdExists.middleware';

const movieRoutes: Router = Router();

movieRoutes.post(
  '',
  ensureBodyIsValidMiddleware(movieSchemaRequest),
  ensureNameExistsMiddleware,
  createMoviesController
);

movieRoutes.get('', getMoviesController);

movieRoutes.patch(
  '/:id',
  ensureIdExistsMiddleware,
  ensureBodyIsValidMiddleware(moviesSchemaUpdateRequest),
  ensureNameExistsMiddleware,
  updateMoviesController
);

movieRoutes.delete('/:id', ensureIdExistsMiddleware, deleteMoviesController);

export default movieRoutes;
