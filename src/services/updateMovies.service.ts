import { Repository } from 'typeorm';
import { Movie } from '../entities';
import { TMovie, TMoviesUpdateRequest } from '../interfaces/movies.interfaces';
import { AppDataSource } from '../data-source';
import { movieSchema } from '../schemas/movies.schemas';

const updateMoviesService = async (
  movieData: TMoviesUpdateRequest,
  movieId: number
): Promise<TMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovieData: Movie | null = await movieRepository.findOneBy({
    id: movieId,
  });

  const newMovieData: Movie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });
  await movieRepository.save(newMovieData);

  const returnMovie: TMovie = movieSchema.parse(newMovieData);

  return returnMovie;
};

export default updateMoviesService;
