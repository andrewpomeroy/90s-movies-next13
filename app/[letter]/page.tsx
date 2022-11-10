import {
  fetchCategoryBySlug,
  PageProps,
  type Category,
} from '#/lib/getCategories';
import { SkeletonCard } from '#/ui/SkeletonCard';
import allLetters from '../../lib/constants/allLetters';
import getMovies from '../../lib/getMovies';
import getMoviesByLetter from '../../lib/getMoviesByLetter';

// const fetchCategory = async (
//   categorySlug: string | undefined,
// ): Promise<Category | undefined> => {
//   // artificial delay
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   if (!categorySlug) return;

//   return await fetchCategoryBySlug(categorySlug);
// };

export default async function Page({ params }: PageProps) {
  // const category = await fetchCategory(params.letter);
  const movies = await getMoviesByLetter(params.letter);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 text-white">
        {movies.map((movie) => (
          <div key={movie.id} className="text-xl">
            <span className="font-bold">{movie.title}</span> ({movie.year})
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return allLetters.map((letter) => ({ letter }));
}
