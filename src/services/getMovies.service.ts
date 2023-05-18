import { FindManyOptions, Repository } from 'typeorm';
import { TGetAllMovies, TMovies } from '../interfaces/movies.interfaces';
import { Movie } from '../entities';
import { AppDataSource } from '../data-source';

const getMoviesService = async (
  sort: any,
  order: string,
  page: number,
  perPage: number
): Promise<TGetAllMovies> => {
  if (page <= 0 || !Number.isInteger(page)) {
    page = 1;
  }

  if (perPage <= 0 || perPage > 5 || !Number.isInteger(perPage)) {
    perPage = 5;
  }

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const count: number = await movieRepository.count();

  const options: FindManyOptions = sort
    ? {
        skip: (page - 1) * perPage,
        take: perPage,
        order: {
          [sort]: order,
        },
      }
    : {
        skip: (page - 1) * perPage,
        take: perPage,
      };

  const movies: Movie[] = await movieRepository.find(options);

  const totalPages: boolean = count <= page * perPage;

  let returnGetResponse: TGetAllMovies = {
    prevPage:
      page === 1
        ? null
        : `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`,
    nextPage: totalPages
      ? null
      : `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`,
    count: count,
    data: movies,
  };

  return returnGetResponse;
};

export default getMoviesService;
