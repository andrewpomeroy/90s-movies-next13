import { cache } from 'react';
import getMovies, { Movie } from './getMovies';
import movies from './movies.json';

const getMoviesByLetter = cache(async (letter: string): Promise<Movie[]> => {
  // console.log("%c💣️ getting movies for letter ", "background: aliceblue; color: dodgerblue; font-weight: bold", letter);
  // const movies = await getMovies();
  return movies.filter(
    (movie) => movie.firstChar?.toLowerCase() === letter?.toLowerCase(),
  );
});

export default getMoviesByLetter;
