function ReviewCard({ review }) {
  return (
    <li className=" w-full">
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
  );
}

export default ReviewCard;
