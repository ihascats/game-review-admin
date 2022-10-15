import Search from './Search';

function Nav() {
  return (
    <nav className=" bg-lime-300 h-14 grid grid-cols-2 items-center p-1 rounded-bl rounded-br">
      <h1 className=" text-stone-800 font-sans text-xl ">Game Review</h1>
      <Search />
    </nav>
  );
}

export default Nav;
