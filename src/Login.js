import { useState } from 'react';

function Login() {
  const [loginFailed, setLoginFailed] = useState(false);

  async function sendLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataToSend = Object.fromEntries(formData);
    var urlencoded = new URLSearchParams();
    urlencoded.append('username', dataToSend.username);
    urlencoded.append('password', dataToSend.password);
    const response = await fetch(
      `${process.env.REACT_APP_APILINK}${window.location.pathname}`,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        mode: 'cors',
        method: 'POST',
        body: urlencoded,
      },
    );
    if (response.status === 200) {
      localStorage.setItem('Authorization', await response.text());
      window.location.replace(`${process.env.PUBLIC_URL}/reviews/all`);
    } else {
      setLoginFailed(true);
      localStorage.clear();
    }
  }

  return (
    <div className=" grid grid-rows-2 w-full justify-center h-screen content-center">
      <form
        onSubmit={(event) => {
          sendLogin(event);
        }}
        className=" grid w-full justify-center h-full content-center"
      >
        <label className=" tracking-wider font-bold text-sm">USERNAME:</label>
        <input name="username" className=" rounded-md bg-lime-100"></input>
        <label className=" tracking-wider font-bold text-sm">PASSWORD:</label>
        <input
          name="password"
          type="password"
          className=" rounded-md bg-lime-100"
        ></input>
        <button
          type="submit"
          className=" mt-4 rounded-md bg-lime-400 hover:bg-cyan-300 text-sm tracking-widest py-1"
        >
          LOGIN
        </button>
      </form>
      {loginFailed ? (
        <h1 className=" text-center text-rose-800 font-bold text-2xl">
          Login Failed
        </h1>
      ) : null}
    </div>
  );
}

export default Login;
