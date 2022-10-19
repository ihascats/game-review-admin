export default function RatingNumpad() {
  function selectedButton(event) {
    event.target.parentElement.childNodes.forEach((button) => {
      if (button.classList.contains('border-lime-500')) {
        button.classList.add('border-rose-500');
        button.classList.remove('border-lime-500');
      }
    });
    event.target.classList.add('border-lime-500');
    event.target.classList.remove('border-rose-500');
  }
  return (
    <div
      onClick={(event) => {
        selectedButton(event);
      }}
      className=" grid grid-cols-5 gap-2 w-fit p-3"
    >
      <button
        className=" bg-zinc-800 px-3 aspect-square border-2 border-rose-500 rounded-md shadow-black shadow-md font-mono"
        type="button"
      >
        1
      </button>
      <button
        className=" bg-zinc-800 px-3 aspect-square border-2 border-rose-500 rounded-md shadow-black shadow-md font-mono"
        type="button"
      >
        2
      </button>
      <button
        className=" bg-zinc-800 px-3 aspect-square border-2 border-rose-500 rounded-md shadow-black shadow-md font-mono"
        type="button"
      >
        3
      </button>
      <button
        className=" bg-zinc-800 px-3 aspect-square border-2 border-rose-500 rounded-md shadow-black shadow-md font-mono"
        type="button"
      >
        4
      </button>
      <button
        className=" bg-zinc-800 px-3 aspect-square border-2 border-rose-500 rounded-md shadow-black shadow-md font-mono"
        type="button"
      >
        5
      </button>
      <button
        className=" bg-zinc-800 px-3 aspect-square border-2 border-rose-500 rounded-md shadow-black shadow-md font-mono"
        type="button"
      >
        6
      </button>
      <button
        className=" bg-zinc-800 px-3 aspect-square border-2 border-rose-500 rounded-md shadow-black shadow-md font-mono"
        type="button"
      >
        7
      </button>
      <button
        className=" bg-zinc-800 px-3 aspect-square border-2 border-rose-500 rounded-md shadow-black shadow-md font-mono"
        type="button"
      >
        8
      </button>
      <button
        className=" bg-zinc-800 px-3 aspect-square border-2 border-rose-500 rounded-md shadow-black shadow-md font-mono"
        type="button"
      >
        9
      </button>
      <button
        className=" bg-zinc-800 px-3 aspect-square border-2 border-rose-500 rounded-md shadow-black shadow-md font-mono"
        type="button"
      >
        10
      </button>
    </div>
  );
}
