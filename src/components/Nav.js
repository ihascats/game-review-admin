import Icons from './Icons';
import Search from './Search';

function Nav({ reviewsList, setReviewsFilter, setSearchState, isMobile }) {
  const uiIcons = Icons();

  function logout() {
    localStorage.clear();
    window.location.replace(`${process.env.PUBLIC_URL}/login`);
  }

  return (
    <nav className=" bg-neutral-800 h-14 grid grid-cols-2 items-center p-1 sticky top-0 z-50">
      {isMobile ? (
        <h1 className=" text-neutral-100 font-mono text-xl fill-zinc-300 flex gap-4">
          GReview <button onClick={logout}>{uiIcons.logout}</button>
        </h1>
      ) : (
        <h1 className=" text-neutral-100 font-mono text-xl fill-zinc-300 flex gap-4">
          Game Review
          <button onClick={logout}>{uiIcons.logout}</button>
        </h1>
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
