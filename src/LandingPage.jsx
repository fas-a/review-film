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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedAward, setSelectedAward] = useState("");

  // Fetch data dari backend, berdasarkan page dan limit
  useEffect(() => {
    fetch(`http://localhost:3001/api/dramas?page=${currentPage}&limit=12`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFilms(data.dramas);
        setTotalPages(data.totalPages); // Set totalPages dari response API
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching films", error);
        setLoading(false);
      });
  }, [currentPage]); // Tambahkan currentPage sebagai dependency agar fetch ulang saat page berubah

  useEffect(() => {
    fetch("http://localhost:3001/session", {
      method: "GET",
      credentials: "include", // Pastikan untuk menyertakan cookies/session
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          // Simpan token ke localStorage atau state
          sessionStorage.setItem("token", data.token);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  // Fungsi untuk handle pagination
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Fungsi untuk handle perubahan filter genre
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  // Fungsi untuk handle perubahan filter year
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    console.log("Selected country ID:", country);
    setCurrentPage(1);
  };

  const handleAvailabilityChange = (availability) => {
    setSelectedAvailability(availability);
    setCurrentPage(1);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleAwardChange = (award) => {
    setSelectedAward(award);
    setCurrentPage(1);
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
      ? film.country_id === Number(selectedCountry)
      : true;

    const matchesAvailability = selectedAvailability
      ? film.availability &&
        film.availability.toLowerCase() === selectedAvailability.toLowerCase()
      : true;

    const matchesStatus = selectedStatus
      ? film.status &&
        film.status.toLowerCase() === selectedStatus.toLowerCase()
      : true;

    const matchesAward = selectedAward
      ? selectedAward === "yes"
        ? film.Awards && film.Awards.length > 0
        : film.Awards && film.Awards.length === 0
      : true;

    return (
      matchesGenre &&
      matchesYear &&
      matchesCountry &&
      matchesAvailability &&
      matchesStatus &&
      matchesAward
    );
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
      <PaginationHome
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
}

export default LandingPage;
