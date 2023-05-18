import { Repository } from 'typeorm';
import { Movie } from '../entities';
import { AppDataSource } from '../data-source';

const deleteMoviesService = async (movieId: number): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepository.findOneBy({
    id: movieId,
  });

  if (movie) await movieRepository.remove(movie);

  return;
};

export default deleteMoviesService;
