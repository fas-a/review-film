import React, { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import SweepCard from "./components/SweepCard";
import Filter from "./components/Filter";
import FilmCardH from "./components/FilmCardH";
import Header from "./components/Header";

function LandingPage() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/dramas") // Full URL to the API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFilms(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching films");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

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
            {/* Render daftar film yang diambil dari API */}
            {films.map((film) => (
              <FilmCardH
                key={film.id}
                src={film.poster || "./img/film.jpg"} // Asumsi ada field 'poster' untuk gambar
                title={film.title} // Asumsi ada field 'title'
                synopsis={film.synopsis} // Asumsi ada field 'description'
                year={film.year} // Asumsi ada field 'year'
                genres={film.Genres} // Asumsi ada field 'genres'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
