import React from 'react';
import Carousel from './components/Carousel';
import SweepCard from './components/SweepCard';
import Filter from './components/Filter';
import FilmCardH from './components/FilmCardH';

function LandingPage() {
  return (
    <div>
      <Carousel />
      <SweepCard title="Most View"/>
      <SweepCard title="Most Popular"/>
      <div class="w-full px-4 md:px-20 xl:px-40 grid mt-4">
        <Filter />
        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <FilmCardH src='./img/film.jpg'/>
            <FilmCardH src='./img/film.jpg'/>
            <FilmCardH src='./img/film.jpg'/>
            <FilmCardH src='./img/film.jpg'/>
            <FilmCardH src='./img/film.jpg'/>
            <FilmCardH src='./img/film.jpg'/>
            <FilmCardH src='./img/film.jpg'/>
            <FilmCardH src='./img/film.jpg'/>
            <FilmCardH src='./img/film.jpg'/>
            <FilmCardH src='./img/film.jpg'/>
            <FilmCardH src='./img/film.jpg'/>
            <FilmCardH src='./img/film.jpg'/>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
