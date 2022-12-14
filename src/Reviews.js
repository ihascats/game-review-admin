import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import ReviewCard from './components/ReviewCard';
import Icons from './components/Icons';
import NewReview from './components/NewReview';
import Loading from './components/Loading';

function Reviews() {
  const [reviewsList, setReviewsList] = useState([]);
  const [reviewsFilter, setReviewsFilter] = useState([]);
  const [searchState, setSearchState] = useState(false);
  const [menuMouseOver, setMenuMouseOver] = useState(false);
  const [fetchStatus, setFetchStatus] = useState();
  const [newReview, setNewReview] = useState(false);

  const uiIcons = Icons();

  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  useEffect(() => {
    const currentLocation = window.location.pathname
      .split('/')
      .splice(2)
      .join('/');
    async function fetchReviews() {
      if (localStorage.Authorization) {
        const response = await fetch(
          `${process.env.REACT_APP_APILINK}/${currentLocation}`,
          {
            mode: 'cors',
            headers: new Headers({
              Authorization: localStorage.Authorization,
            }),
          },
        );
        if (response.status === 200) {
          const json = await response.json(); //extract JSON from the http response
          return { reviews: json, response };
        } else {
          return { response };
        }
      } else {
        const response = await fetch(
          `${process.env.REACT_APP_APILINK}/${currentLocation}`,
          {
            mode: 'cors',
          },
        );
        if (response.status === 200) {
          const json = await response.json(); //extract JSON from the http response
          return { reviews: json, response };
        } else {
          return { response };
        }
      }
    }

    fetchReviews().then(
      function (value) {
        if (value.response.status === 200) {
          setReviewsList(value.reviews);
        } else {
          if (value.response.status === 401) {
            setFetchStatus(`${value.response.status}: Unauthorized`);
          } else {
            setFetchStatus(value.response.status);
          }
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  function newReviewWindow() {
    setNewReview(true);
  }

  return (
    <div className=" bg-zinc-500">
      <Nav
        reviewsList={reviewsList}
        setReviewsFilter={setReviewsFilter}
        setSearchState={setSearchState}
        isMobile={isMobile}
      />
      {fetchStatus ? (
        <h1 className=" text-center text-rose-800 font-bold text-2xl py-12">
          {fetchStatus}
        </h1>
      ) : null}
      {searchState || menuMouseOver ? (
        <div className=" flex fixed top-14 z-40 justify-end w-full h-search-menu overflow-y-scroll">
          <ul
            onMouseOver={() => {
              setMenuMouseOver(true);
            }}
            onMouseLeave={() => {
              setMenuMouseOver(false);
            }}
            className=" grid bg-zinc-900 p-6 gap-6 h-fit sm:w-1/3"
          >
            {(searchState && reviewsFilter.length !== 0) || menuMouseOver
              ? reviewsFilter.map((reviewFiltered) => (
                  <ReviewCard
                    key={reviewFiltered._id}
                    review={reviewFiltered}
                  />
                ))
              : reviewsList.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
          </ul>
        </div>
      ) : null}
      <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {reviewsList.length > 0 ? (
          !localStorage.Authorization ? null : window.location.pathname
              .split('/')
              .splice(2)
              .join('/') === `reviews` ? null : newReview ? null : isMobile ? (
            <button
              onClick={newReviewWindow}
              className=" fixed bottom-5 right-5 bg-lime-300 fill-zinc-600 hover:bg-lime-200 hover:fill-zinc-800 w-fit h-fit rounded-full p-2 z-50"
            >
              {uiIcons.createNew}
            </button>
          ) : (
            <li className=" w-full">
              <button
                onClick={newReviewWindow}
                className=" h-full w-full grid items-end bg-lime-300 fill-zinc-600 hover:bg-lime-200 hover:fill-zinc-800"
              >
                <div className=" grid justify-items-center">
                  {uiIcons.createNew}
                </div>
                <h2 className=" bg-zinc-700 text-zinc-300 font-semibold px-1 text-left">
                  Create a new review
                </h2>
              </button>
            </li>
          )
        ) : fetchStatus ? null : (
          <Loading />
        )}

        {reviewsList.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </ul>
      {newReview ? (
        <NewReview
          setNewReview={setNewReview}
          setReviewsList={setReviewsList}
        />
      ) : null}
    </div>
  );
}

export default Reviews;
