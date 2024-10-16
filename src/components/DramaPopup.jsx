import React, { useState } from "react";
import posterImage from "../img/ourblues.jpg";
import actorImage from "../img/song-jongki.jpeg";

const DramaPopup = ({ drama, actors = [], onClose, onUpdateStatus }) => {
  const [status, setStatus] = useState("");

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
    // Memanggil fungsi onUpdateStatus untuk memperbarui status di CMS
    onUpdateStatus(newStatus);
    // Menutup popup
    onClose();
  };

  // Helper function to ensure data is array or fallback to empty array
  const ensureArray = (value) => (Array.isArray(value) ? value : [value]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-30">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl h-[800px] overflow-y-auto border relative"
        style={{ maxHeight: "80vh" }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-200 hover:text-gray-600 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Drama Info */}
        <div className="flex gap-6">
          {/* Drama Poster */}
          <div className="flex-shrink-0">
            <img
              src={posterImage}
              alt="Drama Poster"
              className="h-64 w-48 rounded-lg object-cover bg-gray-200"
            />
          </div>

          {/* Drama Details */}
          <div>
            <h2 className="text-xl font-bold mb-2">
              Title of the drama 1 that makes two lines
            </h2>
            <p className="text-sm text-gray-800 mb-2">
              Other titles: Title 2, Title 3, Title 4<br />
              Year: Spring 2024
            </p>
            <p className="text-sm text-gray-800 mb-2">
              Synopsis: Sometimes subjective, I don't read it thoroughly. But
              what helps me is the genres. I need to see genres and actors. That
              is what I need.
            </p>
            <p className="text-sm text-gray-800 mb-2">
              Genre: Genre 1, Genre 2, Genre 3
            </p>
            <p className="text-sm text-gray-800 mb-2">Rating: 3.5/5</p>
            <p className="text-sm text-gray-800 mb-2">
              Availability: Fansub: @aoisub on X
            </p>
          </div>
        </div>

        {/* Actors List */}
        <div className="flex justify-between space-x-4 mt-4">
          {[1, 2, 3, 4, 5, 6].map((actorNum) => (
            <div
              key={actorNum}
              className="flex flex-col items-center justify-center w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
            >
              <img
                src={actorImage}
                alt="Actor Name"
                className="w-10 h-10 rounded-full mb-1"
              />
              <span className="text-gray-200 text-sm">Actor {actorNum}</span>
            </div>
          ))}
        </div>

        {/* Trailer Video */}
        <div className="w-full mt-4">
          <div
            className="relative"
            style={{ paddingBottom: "56.25%", height: 0, overflow: "hidden" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/1C7Nph5gFxQ?si=jSL9El7ZG7wbJFO9"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer"
            ></iframe>
          </div>
        </div>

        {/* Approve/Unapprove Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            id="approveBtn"
            type="button"
            className="px-4 py-2 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            style={{ backgroundColor: "#15803d", color: "white" }}
            onClick={() => onUpdateStatus("Approved")}
          >
            Approved
          </button>
          <button
            id="unapproveBtn"
            type="button"
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:shadow-outline-red"
            onClick={() => onUpdateStatus("Unapproved")}
          >
            Unapproved
          </button>
        </div>
      </div>
    </div>
  );
};

export default DramaPopup;
