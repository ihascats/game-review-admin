import Search from './Search';

function Nav({ reviewsList, setReviewsFilter, setSearchState, isMobile }) {
  return (
    <nav className=" bg-neutral-800 h-14 grid grid-cols-2 items-center p-1 sticky top-0 z-50">
      {isMobile ? (
        <h1 className=" text-neutral-100 font-mono text-xl ">GReview</h1>
      ) : (
        <h1 className=" text-neutral-100 font-mono text-xl ">Game Review</h1>
      )}

      <Search
        reviewsList={reviewsList}
        setReviewsFilter={setReviewsFilter}
        setSearchState={setSearchState}
      />
    </nav>
  );
}

export default Nav;
