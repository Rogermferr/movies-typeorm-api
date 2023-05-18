import { z } from 'zod';
import {
  getAllMoviesSchema,
  movieSchema,
  movieSchemaRequest,
  moviesSchema,
} from '../schemas/movies.schemas';
import { DeepPartial } from 'typeorm';

type TMovie = z.infer<typeof movieSchema>;
type TMovieRequest = z.infer<typeof movieSchemaRequest>;
type TMovies = z.infer<typeof moviesSchema>;

type TMoviesUpdateRequest = DeepPartial<TMovieRequest>;

type TGetAllMovies = z.infer<typeof getAllMoviesSchema>;

export { TMovie, TMovieRequest, TMovies, TMoviesUpdateRequest, TGetAllMovies };
