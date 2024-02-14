export default LoginHero;

import { useSelector, useDispatch } from "react-redux";
import React, { useRef, useState } from "react";
import PasswordInput from "../atoms/PasswordInput";
import EmailInput from "../atoms/EmailInput";
import UsernameInput from "../atoms/UsernameInput";
import { useApi } from "../../pages/api/client";
import { RootState } from "../../store/reducer";
import { loginUsername } from "../../store/user/api";

function LoginLogo() {
  return <div className="w-80 h-80 bg-primary rounded-full"></div>;
}

function LoginInputsEmail() {
  const passwordRef = useRef(null);
  return (
    <>
      <EmailInput />
      <PasswordInput inputRef={passwordRef} />
      <button className="btn btn-primary w-full">Login</button>
    </>
  );
}

function LoginInputsUsername() {
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const dispatch = useDispatch();
  const pageContext = useSelector((state: RootState) => state.pageContext);
  const api = useApi();

  return (
    <>
      <UsernameInput inputRef={usernameRef} />
      <PasswordInput inputRef={passwordRef} />
      <button
        className="btn btn-primary w-full"
        onClick={(e) => {
          loginUsername(
            api,
            dispatch,
            pageContext,
            usernameRef.current.value,
            passwordRef.current.value
          );
        }}
      >
        Login
      </button>
    </>
  );
}

type loginOptions = "email" | "username";

function LoginForm() {
  const [loginOption, setLoginOption] = useState<loginOptions>("email");

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl sm:text-5xl font-bold w-full text-center py-8">
        Welcome Back 🤙
      </h1>
      <span className="text-neutral-content text-center">
        Login via{" "}
        <button
          className={`btn ${
            loginOption == "email" ? "btn-primary" : "btn-outline"
          } btn-xs`}
          onClick={() => setLoginOption("email")}
        >
          email
        </button>{" "}
        or{" "}
        <button
          className={`btn ${
            loginOption == "username" ? "btn-primary" : "btn-outline"
          } btn-xs`}
          onClick={() => setLoginOption("username")}
        >
          username
        </button>{" "}
      </span>
      {loginOption === "email" ? <LoginInputsEmail /> : <LoginInputsUsername />}
      <div className="divider my-2" />
      <button className="btn btn-ghost btn-sm">Forgot your password?</button>
      <button className="btn btn-outline btn-sm btn-accent">
        Create Account?
      </button>
    </div>
  );
}

function LoginHero() {
  return (
    <div className="h-screen w-screen relative">
      <div className="h-full w-full p-20 relative">
        <div className="w-full h-full relative flex flex-col lg:flex-row items-center content-center justify-center gap-2">
          <div className="border h-full flex flex-grow items-center content-center justify-center">
            <LoginLogo />
          </div>
          <div className="border h-full flex flex-grow items-center content-center justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
