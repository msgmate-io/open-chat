import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatAppRoot from "../ChatAppRoot";
import React from "react";
import chatIdLoader from "./loaders/chatId";
import chatLoader from "./loaders/chat";

export function getBrowserRouter() {
  const router = createBrowserRouter(
    [
      {
        path: "/chat",
        element: <ChatAppRoot />,
        loader: chatLoader,
        children: [
          {
            path: ":chatId",
            loader: chatIdLoader,
            element: <ChatAppRoot />,
          },
        ],
      },
    ],
    { basename: "" }
  );

  return router;
}
