import { useEffect, useState } from 'react';
import Nav from './Nav';
import ReviewCard from './ReviewCard';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [reviewsList, setReviewsList] = useState([]);
  const [reviewsFilter, setReviewsFilter] = useState([]);
  const [searchState, setSearchState] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch('http://localhost:3000/reviews', {
        mode: 'cors',
      });
      const json = await response.json(); //extract JSON from the http response

      return json;
    }

    fetchReviews().then(
      function (value) {
        setReviewsList(value);
        const reviewCards = value.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ));
        setReviews(reviewCards);
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  return (
    <div>
      <Nav
        reviewsList={reviewsList}
        setReviewsFilter={setReviewsFilter}
        setSearchState={setSearchState}
      />
      <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {searchState && reviewsFilter.length !== 0
          ? reviewsFilter.map((reviewFiltered) => (
              <ReviewCard key={reviewFiltered._id} review={reviewFiltered} />
            ))
          : reviews}
      </ul>
    </div>
  );
}

export default Reviews;
