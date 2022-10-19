import RatingNumpad from './RatingNumpad';
import steam_games from './steam-games.json';
import { useState } from 'react';

export default function NewReview({ setNewReview }) {
  const steamGames = steam_games.applist.apps;
  const [gameId, setGameId] = useState();
  function findGameId(event) {
    if (event.target.value.length < 3) return;
    const result = steamGames.filter((obj) => {
      return obj.name.includes(event.target.value);
    });
    setGameId(result);
  }
  return (
    <div className="overflow-auto grid justify-items-center fixed z-50 h-screen w-screen bottom-0 inset-0 mx-auto md:w-fit bg-gradient-to-br from-rose-600 to-blue-600 text-slate-100 p-4">
      <form className=" grid">
        <label className="w-fit">Game Title:</label>
        <input
          onInput={(event) => {
            findGameId(event);
          }}
          className=" w-64 bg-zinc-700 pl-1"
        ></input>
        {gameId ? (
          <label className="w-fit">{`Steam Id (${gameId.length}):`}</label>
        ) : (
          <label className="w-fit">Steam Id:</label>
        )}

        <select name="status" id="status" className=" w-64 bg-zinc-700">
          {gameId
            ? gameId.map((info) => (
                <option
                  key={info.appid}
                  value={info.appid}
                >{`${info.name}: ${info.appid}`}</option>
              ))
            : null}
        </select>
        <label className="w-fit">Published:</label>
        <input
          type="checkbox"
          className="w-fit bg-zinc-700 accent-yellow-400"
        ></input>
        <label className="w-fit">visuals:</label>
        <RatingNumpad />
        <label className="w-fit">performance:</label>
        <RatingNumpad />
        <label className="w-fit">accessibility:</label>
        <RatingNumpad />
        <label className="w-fit">engagement:</label>
        <RatingNumpad />
        <label className="w-fit">fun:</label>
        <RatingNumpad />
        <label className="w-fit">status:</label>
        <select name="status" id="status" className=" w-64 bg-zinc-700">
          <option value="completed">completed</option>
          <option value="incompleted">incomplete</option>
        </select>
      </form>
    </div>
  );
}
