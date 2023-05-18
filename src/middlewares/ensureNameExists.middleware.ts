import { NextFunction, Request, Response } from 'express';
import { Movie } from '../entities';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { AppError } from '../error';

const ensureNameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const name: string = req.body.name;

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepository.findOne({
    where: {
      name: name,
    },
  });

  if (movie && name) throw new AppError('Movie already exists.', 409);

  return next();
};

export default ensureNameExistsMiddleware;
