import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function FilmCardH({ src }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = () => {
    navigate('/detail');
  };
  return (
    <>
      <div onClick={handleClick} className="min-w-0 mb-4 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <img className="w-full rounded-lg" src={src} alt="" />
        <h4 className="mb-1 mt-2 font-semibold text-gray-800 dark:text-gray-300">
          Judul Film
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">Sinopsis</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">2020</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">Genre 1, Genre 2, Genre 3</p>
        <div className="flex justify-between">
          <p className="text-xs text-gray-600 dark:text-gray-400">Rate 3.5/5</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">19 views</p>
        </div>
      </div>
    </>
  );
}

export default FilmCardH;
