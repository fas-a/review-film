function FilmCardH({ src }) {
  return (
    <>
      <div className="min-w-0 mb-4 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <img className="w-full rounded-lg" src={src} alt="" />
        <h4 className="font-semibold text-gray-600 dark:text-gray-300">
          Film 1 asmasdaw awdwda awfawdfwad afawfawf awfawdfawd asdasd awdadaw
          dadawd
        </h4>
        <h6>2020</h6>
        <h6>Genre 1, Genre 2, Genre 3</h6>
        <div className="flex justify-between">
          <p>Rate 3.5/5</p>
          <p>19 views</p>
        </div>
      </div>
    </>
  );
}

export default FilmCardH;
