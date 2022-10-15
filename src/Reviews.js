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
          <li key={review._id}>
            <a href={process.env.PUBLIC_URL + `/reviews/${review._id}`}>
              <img
                alt=""
                src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${review.steam_id}/header.jpg`}
              ></img>
              <h2>{review.game_title}</h2>
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
      <ul>{reviews}</ul>
    </div>
  );
}

export default Reviews;
