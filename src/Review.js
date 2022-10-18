import { useEffect, useState } from 'react';
import Icons from './Icons';
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

  const uiIcons = Icons();

  let adminHud = [];
  if (reviewInfo) {
    adminHud = (
      <div className=" sticky w-full h-fit bg-zinc-900 bottom-0 grid grid-cols-4 justify-items-center p-2 border-t-4 border-zinc-300">
        <button>{uiIcons.back}</button>
        {reviewInfo.published ? (
          <button>{uiIcons.published}</button>
        ) : (
          <button>{uiIcons.unpublished}</button>
        )}
        <button>{uiIcons.edit}</button>
        <button>{uiIcons.deleteReview}</button>
      </div>
    );
  }

  return (
    <div className=" justify-items-center grid w-full h-screen pb-56">
      {reviewInfo && steamInfo && hltbInfo ? (
        <ReviewInfoPageCard
          reviewInfo={reviewInfo}
          steamInfo={steamInfo}
          hltbInfo={hltbInfo}
        />
      ) : null}
      {adminHud ? adminHud : null}
    </div>
  );
}
export default Review;
