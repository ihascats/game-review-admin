import { useState } from 'react';
import Icons from './Icons';

export default function AdminHud({
  reviewInfo,
  setReviewInfo,
  editStatus,
  setEditStatus,
  editInfo,
  setEditInfo,
}) {
  const [deleteCheck, setDeleteCheck] = useState(false);

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

  async function changeReviewInfo() {
    var urlencoded = new URLSearchParams();
    urlencoded.append('game_title', editInfo.game_title);
    urlencoded.append('visuals', editInfo.visuals);
    urlencoded.append('performance', editInfo.performance);
    urlencoded.append('accessibility', editInfo.accessibility);
    urlencoded.append('engagement', editInfo.engagement);
    urlencoded.append('fun', editInfo.fun);
    urlencoded.append('status', editInfo.status);
    urlencoded.append('published', editInfo.published);
    urlencoded.append('steam_id', editInfo.steam_id);
    const response = await fetch(
      `${process.env.REACT_APP_APILINK}/reviews/${reviewInfo._id}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: new Headers({
          Authorization: localStorage.Authorization,
        }),
        body: urlencoded,
      },
    );
    const json = await response.json();
    if (response.status === 200) {
      setReviewInfo(json.review);
    }
  }

  async function deleteReview() {
    const response = await fetch(
      `${process.env.REACT_APP_APILINK}/reviews/${reviewInfo._id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: new Headers({
          Authorization: localStorage.Authorization,
        }),
      },
    );
    if (response.status === 200) {
      window.location.replace(`${process.env.PUBLIC_URL}/reviews/all`);
    }
  }

  const uiIcons = Icons();
  return (
    <div className=" sticky w-full h-fit bg-zinc-900 bottom-0 grid grid-cols-4 justify-items-center p-2 border-t-4 border-zinc-300 sm:w-1/2 xl:w-1/3 2xl:w-1/4">
      <button
        onClick={() => {
          window.location.replace(`${process.env.PUBLIC_URL}/reviews/all`);
        }}
        className=" fill-zinc-300 hover:fill-yellow-500"
      >
        {uiIcons.home}
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
      {editStatus ? (
        <div className="flex">
          <button
            onClick={() => {
              setEditStatus(false);
              setEditInfo(structuredClone(reviewInfo));
            }}
            className=" fill-zinc-300 hover:fill-green-500"
          >
            {uiIcons.cancel}
          </button>
          <button
            onClick={() => {
              setEditStatus(false);
              changeReviewInfo();
            }}
            className=" fill-zinc-300 hover:fill-green-500"
          >
            {uiIcons.save}
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setEditStatus(true);
          }}
          className=" fill-zinc-300 hover:fill-green-500"
        >
          {uiIcons.edit}
        </button>
      )}

      <button
        onClick={() => {
          setDeleteCheck(true);
        }}
        className=" fill-zinc-300 hover:fill-red-500"
      >
        {uiIcons.deleteReview}
      </button>

      {deleteCheck ? (
        <div className=" grid fixed inset-0 mx-auto h-fit top-1/2 bg-zinc-200 w-fit px-6 py-3 text-zinc-900 rounded-md">
          Proceed with Deletion
          <div className=" grid grid-cols-2 py-1">
            <button
              onClick={() => {
                setDeleteCheck(false);
              }}
              className=" hover:bg-green-500 w-full h-full"
            >
              NO
            </button>
            <button
              onClick={deleteReview}
              className=" hover:bg-red-500 w-full h-full"
            >
              YES
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
