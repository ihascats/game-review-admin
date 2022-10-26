function ReviewInfoPageCard({
  reviewInfo,
  steamInfo,
  hltbInfo,
  editStatus,
  editInfo,
  setEditInfo,
}) {
  function changeInfo(event, infoToChange) {
    const infoCopy = editInfo;
    infoCopy[infoToChange] = event.target.value;
    setEditInfo(infoCopy);
  }

  return (
    <div className=" flex flex-col gap-6 sm:w-1/2 xl:w-1/3 2xl:w-1/4 self-center bg-gradient-to-br from-indigo-600 to-amber-600 text-slate-100 p-4 h-full overflow-y-scroll hide-scroll">
      {reviewInfo.published ? (
        <img
          alt=""
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${reviewInfo.steam_id}/header.jpg`}
          className=" w-full"
        ></img>
      ) : (
        <img
          alt=""
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${reviewInfo.steam_id}/header.jpg`}
          className=" w-full grayscale"
        ></img>
      )}

      <div className="bg-zinc-800 p-3 flex justify-between">
        <h1>{reviewInfo.game_title}</h1>
        <h1>
          {`${
            (reviewInfo.visuals +
              reviewInfo.performance +
              reviewInfo.accessibility +
              reviewInfo.engagement +
              reviewInfo.fun) /
            5
          }`}
          &#9733;
        </h1>
      </div>
      <div className=" flex w-full justify-between bg-zinc-800 px-3 py-6">
        <div className="grid">
          <h2 className=" font-mono font-bold text-xs">Steam Price</h2>
          <h3 className=" font-mono">{steamInfo.final_formatted}</h3>
        </div>
        <div className="grid">
          <h2 className=" font-mono font-bold text-xs">How long to beat~</h2>
          {isNaN(hltbInfo) ? (
            <h3 className=" font-mono">{hltbInfo}</h3>
          ) : (
            <h3 className=" font-mono">{hltbInfo} hours</h3>
          )}
        </div>
        <div className="grid">
          <h2 className=" font-mono font-bold text-xs">Price per hour~</h2>
          {isNaN(hltbInfo) || steamInfo.final === 0 ? (
            <h3 className=" font-mono">N/A</h3>
          ) : (
            <h3 className=" font-mono">
              ${(steamInfo.initial / (hltbInfo * 100)).toFixed(2)}
            </h3>
          )}
        </div>
      </div>
      {editStatus ? (
        <div className="grid grid-cols-2 gap-5 bg-zinc-800 px-3 py-6 ">
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">title</h2>
            <input
              onInput={(event) => {
                changeInfo(event, 'game_title');
              }}
              className=" font-mono bg-zinc-600 w-full text-center rounded-md"
              defaultValue={reviewInfo.game_title}
            ></input>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">steam id</h2>
            <input
              onInput={(event) => {
                changeInfo(event, 'steam_id');
              }}
              className=" font-mono bg-zinc-600 w-full text-center rounded-md"
              defaultValue={reviewInfo.steam_id}
            ></input>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">visuals</h2>
            <input
              onInput={(event) => {
                changeInfo(event, 'visuals');
              }}
              className=" font-mono bg-zinc-600 w-full text-center rounded-md"
              defaultValue={reviewInfo.visuals}
            ></input>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">performance</h2>
            <input
              onInput={(event) => {
                changeInfo(event, 'performance');
              }}
              className=" font-mono bg-zinc-600 w-full text-center rounded-md"
              defaultValue={reviewInfo.performance}
            ></input>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">accessibility</h2>
            <input
              onInput={(event) => {
                changeInfo(event, 'accessibility');
              }}
              className=" font-mono bg-zinc-600 w-full text-center rounded-md"
              defaultValue={reviewInfo.accessibility}
            ></input>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">engagement</h2>
            <input
              onInput={(event) => {
                changeInfo(event, 'engagement');
              }}
              className=" font-mono bg-zinc-600 w-full text-center rounded-md"
              defaultValue={reviewInfo.engagement}
            ></input>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">fun</h2>
            <input
              onInput={(event) => {
                changeInfo(event, 'fun');
              }}
              className=" font-mono bg-zinc-600 w-full text-center rounded-md"
              defaultValue={reviewInfo.fun}
            ></input>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">status</h2>
            <input
              onInput={(event) => {
                changeInfo(event, 'status');
              }}
              className=" font-mono bg-zinc-600 w-full text-center rounded-md"
              defaultValue={reviewInfo.status}
            ></input>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 bg-zinc-800 px-3 py-6 ">
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">visuals</h2>
            <h3 className=" font-mono">{reviewInfo.visuals}&#9733;</h3>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">performance</h2>
            <h3 className=" font-mono">{reviewInfo.performance}&#9733;</h3>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">accessibility</h2>
            <h3 className=" font-mono">{reviewInfo.accessibility}&#9733;</h3>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">engagement</h2>
            <h3 className=" font-mono">{reviewInfo.engagement}&#9733;</h3>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">fun</h2>
            <h3 className=" font-mono">{reviewInfo.fun}&#9733;</h3>
          </div>
          <div className="grid">
            <h2 className=" font-mono font-bold text-xs">status</h2>
            <h3 className=" font-mono">{reviewInfo.status}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewInfoPageCard;
