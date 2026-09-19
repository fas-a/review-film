import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Film, SlidersHorizontal } from "lucide-react";
import "./home.css";

import Filter from "./components/Filter";

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
  const [sortValue, setSortValue] = useState("");
  const [latestFilms, setLatestFilms] = useState([]);

  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  // Fetch data dari backend, berdasarkan page dan 
  const fetchLatestFilms = async () => {
    try {
      const response = await fetch( process.env.REACT_APP_BASE_API_URL + "/api/latest-dramas");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLatestFilms(data);
    } catch (error) {
      console.error("Error fetching latest films", error);
    }
  };
  useEffect(() => {
    const fetchDramas = async () => {
      setLoading(true);
      setError("");
      try {
        const queryParams = new URLSearchParams({
          page: currentPage,
          limit: 12,
          sort: sortValue, // Include sort parameter
        });

        const response = await fetch(
          `${ process.env.REACT_APP_BASE_API_URL}/api/dramas?${queryParams.toString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setFilms(data.dramas);
        setTotalPages(data.totalPages); // Set totalPages dari response API
      } catch (error) {
        setError("We could not load the collection. Please try again in a moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchDramas();
    fetchLatestFilms();
  }, [currentPage, sortValue, retry]);

  useEffect(() => {
    fetch( process.env.REACT_APP_BASE_API_URL + "/session", {
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
  const handleGenreChange = useCallback((genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  }, []);

  // Fungsi untuk handle perubahan filter year
  const handleYearChange = useCallback((year) => {
    setSelectedYear(year);
    setCurrentPage(1);
  }, []);

  const handleCountryChange = useCallback((country) => {
    setSelectedCountry(country);
    // console.log("Selected country ID:", country);
    setCurrentPage(1);
  }, []);

  const handleAvailabilityChange = useCallback((availability) => {
    setSelectedAvailability(availability);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  }, []);

  const handleAwardChange = useCallback((award) => {
    setSelectedAward(award);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((sort) => {
    // Added sort change handler
    setSortValue(sort);
    setCurrentPage(1);
  }, []);

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
      ? String(film.year ?? "") === selectedYear
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

  const resetFilters = () => {
    setSelectedGenre(""); setSelectedYear(""); setSelectedCountry("");
    setSelectedAvailability(""); setSelectedStatus(""); setSelectedAward("");
    setSortValue(""); setCurrentPage(1);
    ["Genre", "Year", "Country", "Availability", "Status", "Award", "Sort"].forEach(
      (key) => localStorage.removeItem(`selected${key}`)
    );
  };

  const renderCard = (film) => (
    <Link to={`/detail/${film.id}`} className="home-card" key={film.id}>
      <div className="home-card-art">
        <img src={film.poster || "/img/film.jpg"} alt={film.title}
          loading="lazy" onError={(event) => { if (!event.currentTarget.dataset.fallback) { event.currentTarget.dataset.fallback = "true"; event.currentTarget.src = "/img/film.jpg"; } }} />
        {film.year && <span className="home-year">{film.year}</span>}
        <span className="home-card-open"><ArrowUpRight size={20} aria-hidden="true" /> View details</span>
      </div>
      <h3>{film.title}</h3>
      <p>{(film.Genres || []).map(getGenreName).filter(Boolean).slice(0, 2).join(" / ") || "Drama & film"}</p>
    </Link>
  );

  return (
    <div className="dramaku-home">
      <Header />
      <main className="home-main">
        <section className="home-hero" aria-labelledby="hero-title">
          <img className="home-hero-image" src="/img/banner-film/film2.jpg" alt="" />
          <div className="home-hero-content">
            <span className="home-eyebrow"><span /> A PLACE FOR STORY LOVERS</span>
            <h1 id="hero-title">Great stories.<br />Start here.</h1>
            <p>Find your next favorite drama. Explore stories, read reviews, and discover something worth watching.</p>
            <a className="home-primary" href="#koleksi">Explore the collection <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
          <div className="home-hero-note"><Film size={20} aria-hidden="true" /><span>Dramas, films, and stories<br /><strong>worth discovering.</strong></span></div>
        </section>

        {latestFilms.length > 0 && <section className="home-section" aria-labelledby="latest-title">
          <div className="home-section-heading"><div><span className="home-kicker">FRESH ON THE SHELF</span><h2 id="latest-title">Recently added<span>.</span></h2></div><a href="#koleksi">Explore all <ArrowUpRight size={18} aria-hidden="true" /></a></div>
          <div className="home-latest">{latestFilms.slice(0, 6).map(renderCard)}</div>
        </section>}

        <section id="koleksi" className="home-section home-collection" aria-labelledby="collection-title">
          <div className="home-section-heading"><div><span className="home-kicker">FIND YOUR NEXT FAVORITE</span><h2 id="collection-title">Explore dramas & films<span>.</span></h2></div><span className="home-page-label">Page {currentPage} / {Math.max(1, totalPages)}</span></div>
          <div className="home-filter-panel">
            <div className="home-filter-heading"><span><SlidersHorizontal size={17} aria-hidden="true" /> Refine your picks</span><button type="button" onClick={resetFilters}>Reset filters</button></div>
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
            selectedSort={sortValue}
            onSortChange={handleSortChange}
          />
          </div>
          <div aria-live="polite" aria-busy={loading}>
            {loading ? <div className="home-grid" role="status" aria-label="Loading collection">{Array.from({ length: 6 }, (_, index) => <div className="home-skeleton" key={index}><div /><span /><span /></div>)}</div>
              : error ? <div className="home-empty" role="alert"><Film size={32} aria-hidden="true" /><h3>Unable to load the collection</h3><p>{error}</p><button className="home-primary" onClick={() => setRetry(value => value + 1)}>Try again</button></div>
              : filteredFilms.length ? <div className="home-grid">{filteredFilms.map(renderCard)}</div>
              : <div className="home-empty"><Film size={32} aria-hidden="true" /><h3>No stories found</h3><p>No titles match on this page. Try different filters or check the next page.</p><button className="home-primary" onClick={resetFilters}>Reset filters</button></div>}
          </div>
          {!loading && !error && <PaginationHome currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </section>
        <footer className="home-footer"><a href="/">Drama<span>Ku</span></a><p>Every story belongs somewhere. Find your favorite.</p><span>Made for story lovers.</span></footer>
      </main>
    </div>
  );
}

export default LandingPage;
