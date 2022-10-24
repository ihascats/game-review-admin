import { Link } from 'react-router-dom';

function ReviewCard({ review }) {
  return (
    <li className=" w-full">
      <Link to={`/reviews/${review._id}`}>
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
          <h2 className=" bg-slate-900 text-stone-100 font-semibold px-1 overflow-clip whitespace-nowrap text-ellipsis">
            {review.game_title}
          </h2>
        ) : (
          <h2 className=" bg-zinc-700 text-zinc-300 font-semibold px-1 overflow-clip whitespace-nowrap text-ellipsis">
            {review.game_title}
          </h2>
        )}
      </Link>
    </li>
  );
}

export default ReviewCard;
