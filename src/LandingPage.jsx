import React, { useEffect, useState } from "react";
import Carousel from "./components/Carousel";
import SweepCard from "./components/SweepCard";
import Filter from "./components/Filter";
import FilmCardH from "./components/FilmCardH";
import PaginationHome from "./components/PaginationHome";
import Header from "./components/Header";

function LandingPage() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAward, setSelectedAward] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/dramas")
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
        console.error("Error fetching films", error);
        setLoading(false);
      });
  }, []);

  // Fungsi untuk handle perubahan filter genre
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  // Fungsi untuk handle perubahan filter year
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    console.log("Selected country ID:", country);
  };

  const handleAvailabilityChange = (availability) => {
    setSelectedAvailability(availability);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handleAwardChange = (award) => {
    setSelectedAward(award); // Menangani perubahan award
  };

  // Fungsi helper untuk mendapatkan nama genre
  const getGenreName = (genre) => {
    if (typeof genre === "string") return genre;
    if (typeof genre === "object" && genre !== null) {
      return genre.name || genre.Name || genre.genre || genre.Genre || "";
    }
    return "";
  };

  // Filter film berdasarkan genre dan tahun yang dipilih
  const filteredFilms = films.filter((film) => {
    const matchesGenre = selectedGenre
      ? film.Genres &&
        film.Genres.some(
          (genre) =>
            getGenreName(genre).toLowerCase() === selectedGenre.toLowerCase()
        )
      : true;

    const matchesYear = selectedYear
      ? film.year.toString() === selectedYear
      : true;

    const matchesCountry = selectedCountry
      ? film.country_id === Number(selectedCountry) // Pastikan mencocokkan ID negara
      : true;

    const matchesAvailability = selectedAvailability
      ? film.availability &&
        film.availability.toLowerCase() === selectedAvailability.toLowerCase() // Gantilah dengan properti yang benar
      : true;

    const matchesStatus = selectedStatus
      ? film.status &&
        film.status.toLowerCase() === selectedStatus.toLowerCase() // Gantilah dengan properti yang benar
      : true;

    const matchesAward = selectedAward
      ? selectedAward === "yes"
        ? film.Awards && film.Awards.length > 0 // Cek jika array Awards ada isinya untuk "yes"
        : film.Awards && film.Awards.length === 0 // Cek jika array Awards kosong untuk "no"
      : true;

    return (
      matchesGenre &&
      matchesYear &&
      matchesCountry &&
      matchesAvailability &&
      matchesStatus &&
      matchesAward
    ); // Film akan muncul jika cocok dengan genre, tahun, negara, atau availability
  });

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
          <Filter
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
            selectedAvailability={selectedAvailability}
            onAvailabilityChange={handleAvailabilityChange}
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
            selectedAward={selectedAward}
            onAwardChange={handleAwardChange}
          />

          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {filteredFilms.length > 0 ? (
              filteredFilms.map((film) => (
                <FilmCardH
                  key={film.id}
                  id={film.id}
                  src={film.poster || "./img/film.jpg"}
                  title={film.title}
                  synopsis={film.synopsis}
                  year={film.year}
                  genres={film.Genres ? film.Genres : []}
                />
              ))
            ) : (
              <p>No films found.</p>
            )}
          </div>
        </div>
      </div>
      <PaginationHome />
    </div>
  );
}

export default LandingPage;
