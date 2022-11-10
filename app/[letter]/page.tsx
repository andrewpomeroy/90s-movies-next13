import {
  fetchCategoryBySlug,
  PageProps,
  type Category,
} from '#/lib/getCategories';
import { SkeletonCard } from '#/ui/SkeletonCard';
import allLetters from '../../lib/constants/allLetters';

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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-6 text-white">
        Letter is {params.letter}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return allLetters.map((letter) => ({ letter }));
}
