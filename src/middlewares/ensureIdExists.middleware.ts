import { NextFunction, Request, Response } from 'express';
import { Movie } from '../entities';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { AppError } from '../error';

const ensureIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieId: number = Number(req.params.id);

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepository.findOne({
    where: {
      id: movieId,
    },
  });

  if (!movie) throw new AppError('Movie not found', 404);

  return next();
};

export default ensureIdExistsMiddleware;
