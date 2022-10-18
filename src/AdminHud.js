import Icons from './Icons';

export default function AdminHud({ reviewInfo, setReviewInfo }) {
  async function changePublished() {
    const response = await fetch(
      `${process.env.REACT_APP_APILINK}/reviews/published/${reviewInfo._id}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: new Headers({
          Authorization: localStorage.Authorization,
        }),
      },
    );
    const json = await response.json();
    if (response.status === 200) {
      setReviewInfo(json.review);
    }
  }

  const uiIcons = Icons();
  return (
    <div className=" sticky w-full h-fit bg-zinc-900 bottom-0 grid grid-cols-4 justify-items-center p-2 border-t-4 border-zinc-300 sm:w-1/2 xl:w-1/3 2xl:w-1/4">
      <button className=" fill-zinc-300 hover:fill-yellow-500">
        {uiIcons.back}
      </button>
      {reviewInfo.published ? (
        <button
          onClick={changePublished}
          className=" fill-zinc-300 hover:fill-blue-500"
        >
          {uiIcons.published}
        </button>
      ) : (
        <button
          onClick={changePublished}
          className=" fill-zinc-300 hover:fill-blue-500"
        >
          {uiIcons.unpublished}
        </button>
      )}
      <button className=" fill-zinc-300 hover:fill-green-500">
        {uiIcons.edit}
      </button>
      <button className=" fill-zinc-300 hover:fill-red-500">
        {uiIcons.deleteReview}
      </button>
    </div>
  );
}
