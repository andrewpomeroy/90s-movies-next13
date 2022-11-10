import { fetchCategories } from '#/lib/getCategories';
import ClickCounter from '#/ui/ClickCounter';
import React from 'react';
// import CategoryNav from '../LetterNav';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const categories = await fetchCategories();
  return (
    <div className="space-y-9">
      <div>{children}</div>
    </div>
  );
}
