import React, { useState } from "react";
import { navigate } from "vike/client/router";
import { useDispatch, useSelector } from "react-redux";

export default Page;

function Page(pageProps) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const chats = useSelector((state) => state.chats);
  console.log(user, chats);

  const [loginData, setLoginData] = useState({
    username: "testUser1",
    password: "Test123!",
    loading: false,
  });

  const performLogin = () => {
    setLoginData({
      ...loginData,
      loading: true,
    });
    fetch("/api/login", {
      headers: {
        "X-CSRFToken": pageProps.xcsrfToken,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username: loginData.username,
        password: loginData.password,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          // sucessfull login is expected to return `user_data`

          dispatch({
            type: "initChats",
            payload: data.chats,
          });

          dispatch({
            type: "initTmpMessages",
            payload: data.chats.results,
          });

          dispatch({
            type: "initUser",
            payload: data.user,
          });
          navigate("/app/");
        });
      }
      // TODO: better error handling
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                placeholder="email"
                className="input input-bordered"
                required
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    username: e.target.value,
                  });
                }}
                defaultValue={loginData.username}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                onChange={(e) => {
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  });
                }}
                defaultValue={loginData.password}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={() => {
                  console.log("LOGIN", loginData);
                  performLogin();
                }}
              >
                Login
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/app/");
                }}
              >
                navigate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
