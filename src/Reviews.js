import { useEffect, useState } from 'react';
import Nav from './Nav';
import ReviewCard from './ReviewCard';

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch('http://localhost:3000/reviews', {
        mode: 'cors',
      });
      const json = await response.json(); //extract JSON from the http response

      const listItems = await Promise.all(
        json.map((review) => <ReviewCard key={review._id} review={review} />),
      );
      return listItems;
    }

    fetchReviews().then(
      function (value) {
        setReviews(value);
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  return (
    <div>
      <Nav />
      <ul className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {reviews}
      </ul>
    </div>
  );
}

export default Reviews;
