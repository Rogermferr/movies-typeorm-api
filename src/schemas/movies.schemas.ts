import { z } from 'zod';

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z
    .number()
    .int()
    .min(1, { message: 'Number must be greater than 0' }),
  price: z.number().int(),
});

const movieSchemaRequest = movieSchema.omit({ id: true });

const moviesSchema = z.array(movieSchema);

const moviesSchemaUpdateRequest = movieSchemaRequest.partial();

const getAllMoviesSchema = z.object({
  prevPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  count: z.number(),
  data: moviesSchema,
});

export {
  movieSchema,
  movieSchemaRequest,
  moviesSchema,
  moviesSchemaUpdateRequest,
  getAllMoviesSchema,
};
