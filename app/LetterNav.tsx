'use client';

import { type Category } from '#/lib/getCategories';
import { TabNavItem } from '#/ui/TabNavItem';
import { useSelectedLayoutSegments } from 'next/navigation';

const LetterNav = ({ letters }: { letters: string[] }) => {
  const [selectedLayoutSegments] = useSelectedLayoutSegments();
  return (
    <div className="flex flex-wrap items-center gap-2 font-mono">
      {letters.map((item) => (
        <TabNavItem
          key={item}
          href={`/${item}`}
          isActive={item === selectedLayoutSegments}
        >
          {item.toUpperCase()}
        </TabNavItem>
      ))}
    </div>
  );
};

export default LetterNav;
