import { useEffect, useState } from 'react';
import AdminHud from './AdminHud';
import Loading from './Loading';
import ReviewInfoPageCard from './ReviewInfoPageCard';

function Review() {
  const [reviewInfo, setReviewInfo] = useState();
  const [editInfo, setEditInfo] = useState();
  const [steamInfo, setSteamInfo] = useState();
  const [hltbInfo, setHltbInfo] = useState();
  const [editStatus, setEditStatus] = useState(false);

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
          setEditInfo(structuredClone(value.review));
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
                if (value.hltb.response.length === 0) {
                  setHltbInfo('N/A');
                } else {
                  if (value.hltb.response[0].gameplayMain === 0) {
                    setHltbInfo('N/A');
                  } else {
                    setHltbInfo(value.hltb.response[0].gameplayMain);
                  }
                }
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

  if (reviewInfo) {
    document.querySelector(
      '.dynamic-bg',
    ).style.backgroundImage = `url('https://cdn.cloudflare.steamstatic.com/steam/apps/${reviewInfo.steam_id}/header.jpg')`;
  }

  return (
    <div
      className={` dynamic-bg h-screen w-screen bg-no-repeat bg-cover bg-center`}
    >
      <div
        className={` items-center flex flex-col w-full h-full backdrop-blur-md`}
      >
        {reviewInfo && steamInfo && String(hltbInfo) ? (
          <ReviewInfoPageCard
            reviewInfo={reviewInfo}
            steamInfo={steamInfo}
            hltbInfo={hltbInfo}
            editStatus={editStatus}
            editInfo={editInfo}
            setEditInfo={setEditInfo}
          />
        ) : (
          <Loading />
        )}
        {reviewInfo && steamInfo && String(hltbInfo) ? (
          <AdminHud
            reviewInfo={reviewInfo}
            editStatus={editStatus}
            setReviewInfo={setReviewInfo}
            setEditStatus={setEditStatus}
            editInfo={editInfo}
            setEditInfo={setEditInfo}
          />
        ) : null}
      </div>
    </div>
  );
}
export default Review;
