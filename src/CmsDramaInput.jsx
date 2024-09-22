import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useNavigate } from "react-router-dom";

const CmsDramaInput = () => {
  const [bannerPreview, setBannerPreview] = useState(null);
  const navigate = useNavigate(); // Definisikan navigate

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Proses submit data di sini, setelah selesai:
    navigate("/cmsdramas"); // Arahkan ke cmsdramas
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <div className="mt-10 flex-1 flex flex-col">
          <main className="h-full pb-16 overflow-y-auto">
            <div className="container grid px-6 mx-auto">
              <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Tables Drama
              </h2>

              <div className="flex flex-col items-center bg-white text-black">
                <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-12 space-y-10">
                  <form
                    className="space-y-8"
                    onSubmit={handleSubmit} // Tambahkan handleSubmit pada onSubmit
                  >
                    <div className="grid grid-cols-12 gap-6">
                      {/* Banner Image Upload */}
                      <div className="col-span-3">
                        <label
                          htmlFor="banner"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Banner Image
                        </label>
                        <input
                          type="file"
                          id="banner"
                          className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500"
                          accept="image/*"
                          onChange={handleBannerChange}
                        />
                        {bannerPreview && (
                          <img
                            id="banner-preview"
                            className="mt-4 w-full rounded-md shadow-md"
                            src={bannerPreview}
                            alt="Banner Preview"
                          />
                        )}
                      </div>

                      {/* Form Fields */}
                      <div className="col-span-9 grid grid-cols-12 gap-4">
                        {/* Title and Alt Title */}
                        <div className="col-span-6">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="Enter the drama title"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="altTitle"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Alternative Title
                          </label>
                          <input
                            type="text"
                            id="altTitle"
                            name="altTitle"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="Enter the alternative title"
                          />
                        </div>

                        {/* Year and Country */}
                        <div className="col-span-6">
                          <label
                            htmlFor="year"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Year
                          </label>
                          <input
                            type="number"
                            id="year"
                            name="year"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="Enter the country of origin"
                          />
                        </div>

                        {/* Synopsis */}
                        <div className="col-span-12">
                          <label
                            htmlFor="synopsis"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Synopsis
                          </label>
                          <textarea
                            id="synopsis"
                            name="synopsis"
                            rows="4"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            defaultValue="Ex:  Synopsis sometimes unhelpful. I don’t read it thoroughly. But what helps me is the genres. I need to see genres and actors. That’s what I want."
                          ></textarea>
                        </div>

                        {/* Availability */}
                        <div className="col-span-12">
                          <label
                            htmlFor="availability"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Availability
                          </label>
                          <input
                            type="text"
                            id="availability"
                            name="availability"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="Ex: Fansub: @xxosub on X"
                          />
                        </div>

                        {/* Trailer Link and Award */}
                        <div className="col-span-6">
                          <label
                            htmlFor="trailer"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Link Trailer
                          </label>
                          <input
                            type="text"
                            id="trailer"
                            name="trailer"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                            placeholder="Enter the trailer link"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="award"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Award
                          </label>
                          <select
                            id="award"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                          >
                            <option value="">Select award</option>
                            <option value="award1">Award 1</option>
                            <option value="award2">Award 2</option>
                          </select>
                        </div>

                        {/* Genres */}
                        <div className="col-span-12">
                          <label
                            htmlFor="genres"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Add Genres
                          </label>
                          <div className="grid grid-cols-6 gap-4 mt-2">
                            {/* Genre checkboxes */}
                            {[
                              "Drama",
                              "Horror",
                              "Comedy",
                              "Romance",
                              "Fantasy",
                              "Action",
                              "Thriller",
                              "Biography",
                              "Documentary",
                              "Reality",
                              "Family",
                              "Animation",
                              "Anime",
                              "War",
                            ].map((genre) => (
                              <div key={genre} className="flex items-center">
                                <input
                                  id={`genre-${genre.toLowerCase()}`}
                                  name="genres"
                                  type="checkbox"
                                  className="h-4 w-4 text-orange-600 border-gray-300 rounded"
                                />
                                <label
                                  htmlFor={`genre-${genre.toLowerCase()}`}
                                  className="ml-2 block text-sm text-gray-900"
                                >
                                  {genre}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Add Actors */}
                        <div className="col-span-12">
                          <label
                            htmlFor="actors"
                            className="block text-sm font-medium text-gray-600"
                          >
                            Add Actors (Up to 9)
                          </label>
                          <input
                            type="text"
                            id="actors"
                            name="actors"
                            placeholder="Search Actor Names"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700 mb-4"
                          />

                          <div className="grid grid-cols-3 gap-4">
                            {/* Actor Images */}
                            {[...Array(9)].map((_, index) => (
                              <div
                                key={index}
                                className="w-40 h-40 rounded-full overflow-hidden"
                              >
                                <img
                                  src="/img/song-jongki.jpeg"
                                  alt="Actor"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mt-12">
                      <button
                        type="submit"
                        className="px-6 py-3 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CmsDramaInput;
