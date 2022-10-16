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
      const response = await fetch(
        `http://localhost:3000${window.location.pathname}`,
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
    <div className="bg-lime-200">
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
        <div className=" flex absolute top-14 z-40 justify-end w-full">
          <ul
            onMouseOver={() => {
              setMenuMouseOver(true);
            }}
            onMouseLeave={() => {
              setMenuMouseOver(false);
            }}
            className=" grid grid-cols-1 bg-lime-500 p-6 gap-6 sm:w-1/3"
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
