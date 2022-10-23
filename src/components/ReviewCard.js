function ReviewCard({ review }) {
  return (
    <li className=" w-full">
      <a href={process.env.PUBLIC_URL + `/reviews/${review._id}`}>
        {review.published ? (
          <img
            alt=""
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${review.steam_id}/header.jpg`}
            className=" w-full"
          ></img>
        ) : (
          <img
            alt=""
            src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${review.steam_id}/header.jpg`}
            className=" w-full grayscale"
          ></img>
        )}
        {review.published ? (
          <h2 className=" bg-slate-900 text-stone-100 font-semibold px-1">
            {review.game_title}
          </h2>
        ) : (
          <h2 className=" bg-zinc-700 text-zinc-300 font-semibold px-1">
            {review.game_title}
          </h2>
        )}
      </a>
    </li>
  );
}

export default ReviewCard;