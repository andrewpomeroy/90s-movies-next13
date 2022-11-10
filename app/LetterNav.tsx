'use client';

import { type Category } from '#/lib/getCategories';
import { TabNavItem } from '#/ui/TabNavItem';
import { useSelectedLayoutSegments } from 'next/navigation';

const LetterNav = ({ letters }: { letters: string[] }) => {
  const [selectedLayoutSegments] = useSelectedLayoutSegments();

  return (
    <div className="flex items-center space-x-4">
      <TabNavItem href="/layouts" isActive={!selectedLayoutSegments}>
        Home
      </TabNavItem>

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
