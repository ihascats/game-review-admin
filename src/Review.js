import { useEffect, useState } from 'react';
import AdminHud from './AdminHud';
import ReviewInfoPageCard from './ReviewInfoPageCard';

function Review() {
  const [reviewInfo, setReviewInfo] = useState();
  const [steamInfo, setSteamInfo] = useState();
  const [hltbInfo, setHltbInfo] = useState();
  useEffect(() => {
    async function fetchReview() {
      const response = await fetch(
        `${process.env.REACT_APP_APILINK}${window.location.pathname}`,
        {
          mode: 'cors',
        },
      );
      if (response.status === 200) {
        const json = await response.json(); //extract JSON from the http response
        return { review: json, response };
      } else {
        return { response };
      }
    }

    async function fetchPrice(steam_id) {
      const response = await fetch(
        `${process.env.REACT_APP_APILINK}/steam-api/${steam_id}`,
        {
          method: 'GET',
          mode: 'cors',
        },
      );
      if (response.status === 200) {
        const json = await response.json(); //extract JSON from the http response
        return { price_overview: json, response };
      } else {
        return { response };
      }
    }

    async function fetchHltb(game_title) {
      const response = await fetch(
        `${process.env.REACT_APP_APILINK}/hltb-api/${game_title}`,
        {
          method: 'GET',
          mode: 'cors',
        },
      );
      if (response.status === 200) {
        const json = await response.json(); //extract JSON from the http response
        return { hltb: json, response };
      } else {
        return { response };
      }
    }

    fetchReview().then(
      function (value) {
        if (value.response.status === 200) {
          setReviewInfo(value.review);
          fetchPrice(value.review.steam_id).then(
            function (value) {
              if (value.response.status === 200) {
                setSteamInfo(value.price_overview);
              } else {
                console.log(value.response.statusText);
              }
            },
            function (error) {
              console.log(error);
            },
          );
          fetchHltb(value.review.game_title).then(
            function (value) {
              if (value.response.status === 200) {
                setHltbInfo(value.hltb.response[0].gameplayMain);
              } else {
                console.log(value.response.statusText);
              }
            },
            function (error) {
              console.log(error);
            },
          );
        } else {
          console.log(value.response.statusText);
        }
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  return (
    <div className=" justify-items-center grid w-full h-screen pb-56">
      {reviewInfo && steamInfo && hltbInfo ? (
        <ReviewInfoPageCard
          reviewInfo={reviewInfo}
          steamInfo={steamInfo}
          hltbInfo={hltbInfo}
        />
      ) : null}
      {reviewInfo && steamInfo && hltbInfo ? (
        <AdminHud reviewInfo={reviewInfo} setReviewInfo={setReviewInfo} />
      ) : null}
    </div>
  );
}
export default Review;
