import { cache } from 'react';

const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const fs = require('fs');
const dashify = require('dashify');

const baseUrl = 'https://en.wikipedia.org/wiki/List_of_American_films_of_';
const baseYear = 1990;
const years = [...new Array(10).keys()].map((i) => baseYear + i);

type ScrapedRow = {
  title: string;
  director: string;
  cast: string;
  genre: string;
  notes: string;
};

export type Movie = ScrapedRow & {
  year: string;
  id: string;
  firstChar: string;
};

const removeDuplicates = (movies: Movie[]): Movie[] => {
  let usedIds = new Set();
  const output = movies.filter((movie) => {
    if (!usedIds.has(movie.id)) {
      usedIds.add(movie.id);
      return true;
    }
  });
  return output;
};

const columns = [
  {
    name: 'title',
    selector: 'td:nth-child(1)',
  },
  {
    name: 'director',
    selector: 'td:nth-child(2)',
  },
  {
    name: 'cast',
    selector: 'td:nth-child(3)',
  },
  {
    name: 'genre',
    selector: 'td:nth-child(4)',
  },
  {
    name: 'notes',
    selector: 'td:nth-child(5)',
  },
];

const articles = ['a', 'an', 'the'];

const getFirstChar = (title) => {
  let cleanTitle = title.replace(/[^a-zA-Z0-9]*/, '').toLowerCase();
  articles.forEach((article) => {
    if (cleanTitle.startsWith(article)) {
      console.log(cleanTitle, article);
      cleanTitle = cleanTitle.replace(article, '').trim()[0];
      return;
    }
  });
  const letter = cleanTitle[0].replace(/[0-9]/, '#');
  return letter;
};

// Async scraper function
const getMovies = cache(async (): Promise<Movie[]> => {
  console.log(
    '%c💣️ getting all movies',
    'background: aliceblue; color: dodgerblue; font-weight: bold',
  );
  let movies: Movie[] = [];
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const url = baseUrl + year;
    try {
      // Fetch HTML of the page we want to scrape
      const { data } = await axios.get(url);
      // Load HTML we fetched in the previous line
      const $ = cheerio.load(data);

      const rows = $('table.wikitable tr');

      let output: Movie[] = [];
      rows.each((idx: number, el: any) => {
        const rowData = {};
        columns.forEach((col) => {
          const cellContent = $(el).find(col.selector).text();
          rowData[col.name] = String(cellContent);
        });
        const row = rowData as ScrapedRow;
        if (
          Object.values(rowData).some((value: string) => value?.trim().length)
        ) {
          const newRow = row as Movie;
          newRow.title = row.title.trim();
          newRow.firstChar = getFirstChar(newRow.title);
          newRow.year = year.toString();
          newRow.id = `${dashify(newRow.title)}-${newRow.year}`;
          output.push(newRow);
        }
      });
      // movies.push(...nonEmptyRows);
      // movies.set(year, output);
      movies = removeDuplicates([...movies, ...output]);

      // fs.writeFile("movies.json", JSON.stringify(nonEmptyRows, null, 2), (err) => {
      //   if (err) {
      //     console.error(err);
      //     return;
      //   }
      //   console.log("Successfully written data to file");
      // });
    } catch (err) {
      console.error(err);
    }
  }
  return movies;
});

export default getMovies;
