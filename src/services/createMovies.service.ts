import { Repository } from 'typeorm';
import { Movie } from '../entities';
import { TMovie, TMovieRequest } from '../interfaces/movies.interfaces';
import { AppDataSource } from '../data-source';
import { movieSchema } from '../schemas/movies.schemas';

const createMoviesService = async (
  movieData: TMovieRequest
): Promise<Movie> => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(movieData);
  await movieRepository.save(movie);

  const returnMovie: TMovie = movieSchema.parse(movie);

  return returnMovie;
};

export default createMoviesService;
