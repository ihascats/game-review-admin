function Search({ reviewsList, setReviewsFilter, setSearchState }) {
  function find(event) {
    const substring = event.target.value.toLowerCase();
    setReviewsFilter(
      reviewsList.filter((review) =>
        review.game_title.toLowerCase().includes(substring),
      ),
    );
  }

  return (
    <form className="flex items-center justify-end">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-36 md:w-48 lg:w-72 2xl:w-2/3">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          onSelect={(event) => {
            find(event);
          }}
          onInput={(event) => {
            find(event);
          }}
          onFocus={() => {
            setSearchState(true);
          }}
          onBlur={() => {
            setSearchState(false);
          }}
          type="text"
          id="simple-search"
          className="bg-neutral-100 border border-neutral-600 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
        ></input>
      </div>
    </form>
  );
}

export default Search;
