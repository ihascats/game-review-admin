import Icons from './Icons';

export default function Loading() {
  const uiIcons = Icons();
  return (
    <div className=" w-screen h-screen grid justify-items-center items-center">
      {uiIcons.loading}
    </div>
  );
}
