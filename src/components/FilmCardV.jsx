function FilmCardV({ src, title }) {
  return (
    <>
      {/* Hello world */}
      <div className="inline-block px-3">
        <div className="relative w-40 h-60 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <img
            src={src}
            className="object-cover w-full h-full"
            alt=""
          />
          <p className="w-full absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-center text-white">
            {title}
          </p>
        </div>
      </div>
    </>
  );
}

export default FilmCardV;
