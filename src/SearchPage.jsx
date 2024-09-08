import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Filter from './components/Filter';
import FilmCardH from './components/FilmCardH';

function SearchPage() {
    const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  return (
    <div>
      <div className="w-full px-4 md:px-20 xl:px-40 grid mt-4">
        {/* Bagian untuk menampilkan keterangan pencarian */}
        <div className="mb-4 text-lg text-gray-700 dark:text-gray-200">
          Menampilkan hasil pencarian untuk: <strong>{searchQuery}</strong>
        </div>
        <Filter />
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          {/* Ubah src dengan hasil pencarian yang relevan */}
          <FilmCardH src='./img/film.jpg' />
          <FilmCardH src='./img/film.jpg' />
          <FilmCardH src='./img/film.jpg' />
          <FilmCardH src='./img/film.jpg' />
          <FilmCardH src='./img/film.jpg' />
          <FilmCardH src='./img/film.jpg' />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
