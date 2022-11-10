import '#/styles/globals.css';
import LetterNav from './LetterNav';
import allLetters from '../lib/constants/allLetters';

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Next.js App Directory Playground</title>
        <meta
          name="description"
          content="Next.js App Directory Playground"
          key="desc"
        />
      </head>
      <body className="overflow-y-scroll bg-gray-900">
        <div className="flex flex-row justify-center p-8">
          <div className="max-w-3xl flex-grow">
            <div className="rounded-xl border border-gray-800 bg-black p-8">
              <LetterNav letters={allLetters} />
              <div className="mt-5">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
