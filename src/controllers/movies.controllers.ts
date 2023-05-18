import { Request, Response } from 'express';
import {
  TGetAllMovies,
  TMovie,
  TMovieRequest,
} from '../interfaces/movies.interfaces';
import createMoviesService from '../services/createMovies.service';
import { Movie } from '../entities';
import getMoviesService from '../services/getMovies.service';
import updateMoviesService from '../services/updateMovies.service';
import deleteMoviesService from '../services/deleteMovies.service';

const createMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMovieRequest = req.body;

  const newMovie: Movie = await createMoviesService(movieData);

  return res.status(201).json(newMovie);
};

const getMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let sort: any = req.query.sort;
  let order: any = req.query.order ? req.query.order : 'asc';
  let page: number = Number(req.query.page) || 1;
  let perPage: number = Number(req.query.perPage) || 5;

  const allMovies: TGetAllMovies = await getMoviesService(
    sort,
    order,
    page,
    perPage
  );

  return res.json(allMovies);
};

const updateMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData = req.body;
  const movieId: number = parseInt(req.params.id);

  const newUserData: TMovie = await updateMoviesService(movieData, movieId);
  return res.json(newUserData);
};

const deleteMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = Number(req.params.id);

  await deleteMoviesService(movieId);

  return res.status(204).send();
};

export {
  createMoviesController,
  getMoviesController,
  updateMoviesController,
  deleteMoviesController,
};
