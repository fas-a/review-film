import React, { useState } from "react";

const Pagination = () => {
  // State untuk halaman aktif
  const [activePage, setActivePage] = useState(1);

  // Jumlah total halaman
  const totalPages = 9;

  // Fungsi untuk menangani klik tombol halaman
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // Fungsi untuk tombol Previous dan Next
  const handlePreviousClick = () => {
    if (activePage > 1) setActivePage(activePage - 1);
  };

  const handleNextClick = () => {
    if (activePage < totalPages) setActivePage(activePage + 1);
  };

  return (
    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
      <span className="flex items-center col-span-3">
        Showing {activePage * 10 - 9}-{activePage * 10} of 100
      </span>
      <span className="col-span-2"></span>
      <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul className="inline-flex items-center">
            {/* Tombol Previous */}
            <li>
              <button
                onClick={handlePreviousClick}
                disabled={activePage === 1}
                className={`px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple ${
                  activePage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
                aria-label="Previous"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>

            {/* Tombol Halaman */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <li key={pageNumber}>
                  <button
                    onClick={() => handlePageClick(pageNumber)}
                    className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${
                      activePage === pageNumber
                        ? "text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600"
                        : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}

            {/* Tombol Next */}
            <li>
              <button
                onClick={handleNextClick}
                disabled={activePage === totalPages}
                className={`px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple ${
                  activePage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                aria-label="Next"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </span>
    </div>
  );
};

export default Pagination;
