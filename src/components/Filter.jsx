import React, { useEffect, useState } from "react";

function Filter({
  selectedGenre,
  onGenreChange,
  selectedYear,
  onYearChange,
  selectedCountry,
  onCountryChange,
  selectedAvailability,
  onAvailabilityChange,
  selectedStatus,
  onStatusChange,
}) {
  // Fungsi untuk menangani perubahan pada dropdown
  const handleGenreSelect = (event) => {
    onGenreChange(event.target.value); // Kirim nilai genre yang dipilih ke parent
  };

  // Fungsi untuk menangani perubahan pada dropdown year
  const handleYearSelect = (event) => {
    onYearChange(event.target.value); // Kirim nilai year yang dipilih ke parent
  };

  const handleCountrySelect = (event) => {
    onCountryChange(event.target.value); // Kirim nilai country yang dipilih ke parent
  };

  const handleAvailabilitySelect = (event) => {
    onAvailabilityChange(event.target.value); // Kirim nilai availability yang dipilih ke parent
  };

  const handleStatusSelect = (event) => {
    onStatusChange(event.target.value); // Kirim nilai status yang dipilih ke parent
  };

  const [countryId, setCountryId] = useState("");
  const [countries, setCountries] = useState([]);

  // Fetch countries
  useEffect(() => {
    // Fetch countries
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/countries");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        console.log(data); // Check the structure of the data here
        setCountries(data); // Store countries in state
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries(); // Call fetchCountries inside useEffect
  }, []); // Empty dependency array to run only on component mount

  return (
    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-between flex-wrap items-center">
        <div className="flex justify-between flex-wrap items-center gap-6">
          <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            Filter:
          </h4>
          <label className="block text-sm">
            <select
              className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              onChange={handleCountrySelect}
              value={selectedCountry} // Pastikan ini sesuai dengan props
            >
              <option value="">-- Country --</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <select
              className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              onChange={handleYearSelect}
              value={selectedYear}
            >
              <option value="">-- Year --</option>
              <option value={2024}>2024</option>
              <option value={2023}>2023</option>
              <option value={2022}>2022</option>
              <option value={2021}>2021</option>
              <option value={2020}>2020</option>
              <option value={2019}>2019</option>
              <option value={2018}>2018</option>
              <option value={2017}>2017</option>
            </select>
          </label>
          <label className="block text-sm">
            <select
              className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              onChange={handleGenreSelect}
              value={selectedGenre}
            >
              <option value="">-- Genre --</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
            </select>
          </label>

          <label className="block text-sm">
            <select
              className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              onChange={handleStatusSelect}
              value={selectedStatus}
            >
              <option value="">-- Status --</option>
              <option value="approved">Approved</option>
              <option value="unapproved">Unapproved</option>
            </select>
          </label>
        </div>
        <div className="flex justify-between flex-wrap items-center gap-6">
          <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
            Sorted By:
          </h4>
          <label className="block text-sm">
            <select
              className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              onChange={handleAvailabilitySelect}
              value={selectedAvailability} // Pastikan ini sesuai dengan props
            >
              <option value="">-- Availability --</option>
              <option value="netflix">Netflix</option>
              <option value="vidio">Vidio</option>
              <option value="amazon">Amazon</option>
              <option value="disney+">Disney+</option>
              <option value="hbo">HBO</option>
              <option value="hotstar">Hotstar</option>
              <option value="bstation">Bstation</option>
              <option value="crunchyroll">Crunchyroll</option>
            </select>
          </label>
          <label className="block text-sm">
            <select className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
              <option value="">-- Award --</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Filter;
