import React, { useState } from "react";
import { navigate } from "vike/client/router";
import { useDispatch, useSelector } from "react-redux";
import LoginHero from "../../ui/login/LoginHero";

export default Page;

function Page(pageProps) {
  const dispatch = useDispatch();

  return <LoginHero />;
}
