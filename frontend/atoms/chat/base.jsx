import React from "react";

export function ChatBox({ children }) {
  return (
    <div className="flex flex-col h-screen w-screen p-1 md:p-2 xl:p-8 2xl:p-16 gap-1">
      <div className="flex flex-row w-full h-full">{children}</div>
    </div>
  );
}
