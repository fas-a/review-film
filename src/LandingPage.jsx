import React from "react";
import Carousel from "./components/Carousel";
import SweepCard from "./components/SweepCard";
import Filter from "./components/Filter";
import FilmCardH from "./components/FilmCardH";
import Header from "./components/Header";

function LandingPage() {
  return (
    <div>
      <Header />
      <div className="pt-20">
        <Carousel />
        <SweepCard title="Most View" />
        <SweepCard title="Most Popular" />
        <div className="w-full px-4 md:px-20 xl:px-40 grid mt-4">
          <Filter />
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <FilmCardH src="./img/film.jpg" />
            <FilmCardH src="./img/film.jpg" />
            <FilmCardH src="./img/film.jpg" />
            <FilmCardH src="./img/film.jpg" />
            <FilmCardH src="./img/film.jpg" />
            <FilmCardH src="./img/film.jpg" />
            <FilmCardH src="./img/film.jpg" />
            <FilmCardH src="./img/film.jpg" />
            <FilmCardH src="./img/film.jpg" />
            <FilmCardH src="./img/film.jpg" />
            <FilmCardH src="./img/film.jpg" />
            <FilmCardH src="./img/film.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
