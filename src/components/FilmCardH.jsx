import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FilmCardH({ title, src, synopsis, year, genres = [], rate, views }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
    navigate('/detail');
  };

  // Ensure genres is an array before mapping
  console.log(genres);
  const genreNames = genres.map((genre) => genre.name).join(', ') || 'No genres available';

  return (
    <div onClick={handleClick} className="min-w-0 mb-4 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <img className="w-full rounded-lg" src={src} alt={title} />
      <h4 className="mb-1 mt-2 font-semibold text-gray-800 dark:text-gray-300">
        {title}
      </h4>
      <p className="text-xs text-gray-600 dark:text-gray-400">{synopsis}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400">{year}</p>
      <p className="text-xs text-gray-600 dark:text-gray-400">{genreNames}</p>
      <div className="flex justify-between">
        <p className="text-xs text-gray-600 dark:text-gray-400">Rate 3.5/5</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">19 views</p>
      </div>
    </div>
  );
}

export default FilmCardH;
