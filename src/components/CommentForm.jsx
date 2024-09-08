function CommentForm() {
    return (
      <form action="" method="post">
        <div className="px-4 py-3">
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Nama</span>
            <input
              type="text"
              className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
              placeholder="Jane Doe"
            />
          </label>
  
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">Komen</span>
            <textarea
              className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              rows="3"
              placeholder="Enter some long form content."
            ></textarea>
          </label>
  
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
  
  export default CommentForm;
  