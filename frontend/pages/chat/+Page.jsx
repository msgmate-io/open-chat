import React from "react";
import ChatApp from "../../ui/ChatApp";

export default Page;

function Page() {
  if (typeof window === "undefined") {
    return <></>;
  }
  return <ChatApp />;
}
