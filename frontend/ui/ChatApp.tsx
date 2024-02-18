export default ChatApp;

import ChatLayout from "./chat/ChatLayout";
import UserDataLoader from "./atoms/UserDataLoader";
import PageContextProcessor from "./atoms/PageContextProcessor";
import ChatList from "./chat/ChatList";
import ChatView from "./chat/ChatView";
import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function ChatAppRoot() {
  return (
    <ChatLayout>
      <UserDataLoader />
      <PageContextProcessor />
      <ChatList />
      <ChatView />
    </ChatLayout>
  );
}

function FallbackElement() {
  return (
    <div className="w-screen h-screen bg-error flex items-center content-center justify-center">
      Rendering...
    </div>
  );
}

function useBrowserRouter() {
  const router = createBrowserRouter(
    [
      {
        path: "/chat",
        element: <ChatAppRoot />,
        children: [
          {
            path: ":chatId",
            element: <ChatAppRoot />,
          },
        ],
      },
    ],
    { basename: "" }
  );

  return router;
}

function ChatApp() {
  const router = useBrowserRouter();
  return (
    <RouterProvider router={router} fallbackElement={<FallbackElement />} />
  );
}
