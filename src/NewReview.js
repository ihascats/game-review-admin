import RatingNumpad from './RatingNumpad';
import steam_games from './steam-games.json';
import { useState } from 'react';
import Icons from './Icons';

export default function NewReview({ setNewReview, setReviewsList }) {
  const steamGames = steam_games.applist.apps;
  const [gameId, setGameId] = useState();
  const icons = Icons();
  const [imageId, setImageId] = useState();

  function findGameId(event) {
    if (event.target.value.length < 3) return;
    const result = steamGames.filter((obj) => {
      return obj.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setGameId(result);
    if (result.length > 0) {
      setImageId(result[0].appid);
      newReviewInfo.steam_id = result[0].appid;
    }
  }

  const [newReviewInfo, setNewReviewInfo] = useState({
    game_title: '',
    visuals: 1,
    performance: 1,
    accessibility: 1,
    engagement: 1,
    fun: 1,
    status: 'completed',
    published: false,
    steam_id: 0,
  });

  async function createReview() {
    if (newReviewInfo.length === 0 || newReviewInfo.steam_id === 0) return;
    const urlencoded = new URLSearchParams();
    urlencoded.append('game_title', newReviewInfo.game_title);
    urlencoded.append('visuals', newReviewInfo.visuals);
    urlencoded.append('performance', newReviewInfo.performance);
    urlencoded.append('accessibility', newReviewInfo.accessibility);
    urlencoded.append('engagement', newReviewInfo.engagement);
    urlencoded.append('fun', newReviewInfo.fun);
    urlencoded.append('status', newReviewInfo.status);
    urlencoded.append('published', newReviewInfo.published);
    urlencoded.append('steam_id', newReviewInfo.steam_id);
    const response = await fetch(`${process.env.REACT_APP_APILINK}/reviews`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        Authorization: localStorage.Authorization,
      }),
      body: urlencoded,
    });
    const json = await response.json();
    if (response.status === 200) {
      setReviewsList(json.reviews);
      setNewReview(false);
    }
  }

  return (
    <div className="overflow-auto items-start grid justify-items-center fixed z-50 h-search-menu mt-14 w-screen bottom-0 md:w-fit bg-gradient-to-br from-rose-600 to-blue-600 text-slate-100 p-4">
      <form className=" grid ">
        <label className="w-fit">Game Title:</label>
        <input
          onInput={(event) => {
            findGameId(event);
            const clone = structuredClone(newReviewInfo);
            clone.game_title = event.target.value.trim();
            setNewReviewInfo(clone);
          }}
          className=" w-64 bg-zinc-700 pl-1"
        ></input>
        {gameId ? (
          <label className="w-fit">{`Steam Id (${gameId.length}):`}</label>
        ) : (
          <label className="w-fit">Steam Id:</label>
        )}

        <select
          onChange={(event) => {
            setImageId(event.target.value);
            const clone = structuredClone(newReviewInfo);
            clone.steam_id = event.target.value;
            setNewReviewInfo(clone);
            event.target.parentElement.children[1].value = gameId.filter(
              (game) => game.appid === Number(event.target.value),
            )[0].name;
          }}
          name="steam_id"
          id="steam_id"
          className=" w-64 bg-zinc-700"
        >
          {gameId
            ? gameId.map((info) => (
                <option
                  key={info.appid}
                  value={info.appid}
                >{`${info.name}: ${info.appid}`}</option>
              ))
            : null}
        </select>
        {imageId ? (
          <img
            alt=""
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${imageId}/header.jpg`}
            className=" w-64 p-3 bg-zinc-800 my-3"
          ></img>
        ) : (
          <div className="w-64 aspect-video bg-zinc-800 my-3"></div>
        )}
        <label className="w-fit">Published:</label>
        <input
          onChange={() => {
            const clone = structuredClone(newReviewInfo);
            clone.published = !clone.published;
            setNewReviewInfo(clone);
          }}
          type="checkbox"
          className="w-fit bg-zinc-700 accent-yellow-400"
        ></input>
        <label className="w-fit">visuals:</label>
        <RatingNumpad
          newReviewInfo={newReviewInfo}
          setNewReviewInfo={setNewReviewInfo}
          value={'visuals'}
        />
        <label className="w-fit">performance:</label>
        <RatingNumpad
          newReviewInfo={newReviewInfo}
          setNewReviewInfo={setNewReviewInfo}
          value={'performance'}
        />
        <label className="w-fit">accessibility:</label>
        <RatingNumpad
          newReviewInfo={newReviewInfo}
          setNewReviewInfo={setNewReviewInfo}
          value={'accessibility'}
        />
        <label className="w-fit">engagement:</label>
        <RatingNumpad
          newReviewInfo={newReviewInfo}
          setNewReviewInfo={setNewReviewInfo}
          value={'engagement'}
        />
        <label className="w-fit">fun:</label>
        <RatingNumpad
          newReviewInfo={newReviewInfo}
          setNewReviewInfo={setNewReviewInfo}
          value={'fun'}
        />
        <label className="w-fit">status:</label>
        <select
          onChange={(event) => {
            const clone = structuredClone(newReviewInfo);
            clone.status = event.target.value;
            setNewReviewInfo(clone);
          }}
          name="status"
          id="status"
          className=" w-64 bg-zinc-700"
        >
          <option value="completed">completed</option>
          <option value="incomplete">incomplete</option>
        </select>
        <div className=" grid justify-items-center grid-cols-2 px-6 pt-6">
          <button
            onClick={() => {
              setNewReview(false);
            }}
            type="reset"
            className=" fill-red-500 bg-zinc-800 p-2 aspect-square rounded-md border-2 border-red-500 shadow-md shadow-black"
          >
            {icons.cancel}
          </button>
          <button
            onClick={() => {
              createReview();
            }}
            type="button"
            className=" fill-lime-500 bg-zinc-800 p-2 aspect-square rounded-md border-2 border-lime-500 shadow-md shadow-black"
          >
            {icons.check}
          </button>
        </div>
      </form>
    </div>
  );
}
