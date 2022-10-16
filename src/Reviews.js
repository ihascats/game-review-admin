import { useEffect, useState } from 'react';
import Nav from './Nav';
import ReviewCard from './ReviewCard';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [reviewsFilter, setReviewsFilter] = useState([]);
  const [searchState, setSearchState] = useState(false);
  const [menuMouseOver, setMenuMouseOver] = useState(false);
  const [fetchStatus, setFetchStatus] = useState();

  useEffect(() => {
    async function fetchReviews() {
      if (localStorage.Authorization) {
        const response = await fetch(
          `${process.env.REACT_APP_APILINK}${window.location.pathname}`,
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
          `${process.env.REACT_APP_APILINK}${window.location.pathname}`,
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
          const reviewCards = value.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ));
          setReviews(reviewCards);
        } else {
          setFetchStatus(value.response.statusText);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  return (
    <div className="bg-slate-300">
      <Nav
        reviewsList={reviewsList}
        setReviewsFilter={setReviewsFilter}
        setSearchState={setSearchState}
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
            className=" grid bg-slate-500 p-6 gap-6 h-fit sm:w-1/3"
          >
            {(searchState && reviewsFilter.length !== 0) || menuMouseOver
              ? reviewsFilter.map((reviewFiltered) => (
                  <ReviewCard
                    key={reviewFiltered._id}
                    review={reviewFiltered}
                  />
                ))
              : reviews}
          </ul>
        </div>
      ) : null}
      <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {reviews}
      </ul>
    </div>
  );
}

export default Reviews;
