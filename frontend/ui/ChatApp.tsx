export default ChatApp;

import React from "react";
import RouterFallbackElement from "./atoms/RouterFallbackElement";
import { getBrowserRouter } from "./routing/router";
import { RouterProvider } from "react-router-dom";

function ChatApp() {
  let router = null;
  try {
    router = getBrowserRouter();
  } catch (e) {}
  return router ? (
    <RouterProvider
      router={router}
      fallbackElement={<RouterFallbackElement />}
    />
  ) : (
    <RouterFallbackElement />
  );
}
