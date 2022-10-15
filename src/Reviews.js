import { useEffect, useState } from 'react';
import Nav from './Nav';

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const response = await fetch('http://localhost:3000/reviews', {
        mode: 'cors',
      });
      const json = await response.json(); //extract JSON from the http response

      const listItems = await Promise.all(
        json.map((review) => (
          <li key={review._id} className=" w-full">
            <a href={process.env.PUBLIC_URL + `/reviews/${review._id}`}>
              <img
                alt=""
                src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${review.steam_id}/header.jpg`}
                className=" w-full"
              ></img>
              <h2 className=" bg-pink-800 text-stone-100 font-semibold px-1">
                {review.game_title}
              </h2>
            </a>
          </li>
        )),
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
