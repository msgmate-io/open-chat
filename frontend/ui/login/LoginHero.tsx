export default LoginHero;

import { useSelector, useDispatch } from "react-redux";
import React, { useRef, useState } from "react";
import PasswordInput from "../atoms/PasswordInput";
import EmailInput from "../atoms/EmailInput";
import UsernameInput from "../atoms/UsernameInput";
import { useApi } from "../../pages/api/client";
import { RootState } from "../../store/reducer";
import { loginUsername } from "../../store/user/api";
import { StatusTypes } from "../../store/types";
import FormSubmitButton from "../atoms/FormSubmitButton";
import FieldErrorDisplay from "../atoms/FieldErrorDisplay";

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
  const userStatus = useSelector((state: RootState) => state.user.status);
  const userErrors = useSelector((state: RootState) => state.user.errors);
  const pageContext = useSelector((state: RootState) => state.pageContext);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const dispatch = useDispatch();
  const api = useApi();

  const onLogin = () => {
    loginUsername(
      api,
      dispatch,
      pageContext,
      usernameRef.current.value,
      passwordRef.current.value
    );
  };

  return (
    <>
      <UsernameInput
        status={userStatus}
        errors={userErrors}
        inputRef={usernameRef}
      />
      <PasswordInput
        status={userStatus}
        errors={userErrors}
        inputRef={passwordRef}
      />
      <FormSubmitButton status={userStatus} onClick={onLogin}>
        Login
      </FormSubmitButton>
      <FieldErrorDisplay errors={userErrors} status={userStatus} />
    </>
  );
}

type loginOptions = "email" | "username";

function LoginForm() {
  const [loginOption, setLoginOption] = useState<loginOptions>("username");

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl sm:text-5xl font-bold w-full text-center py-8">
        Welcome Back 🤙
      </h1>
      <span className="text-neutral-content text-center">
        Login via{" "}
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
          <div className="h-full flex flex-grow items-center content-center justify-center">
            <LoginLogo />
          </div>
          <div className="h-full flex flex-grow items-center content-center justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
