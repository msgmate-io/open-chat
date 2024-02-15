export default ChatSearch;

import React from "react";

function ChatSearch() {
  return (
    <div className="w-full flex flex-row justify-center items-center content-center my-2">
      <div className="flex h-full content-center items-center justify-center px-1">
        <kbd className="kbd kbd-sm">/</kbd>
      </div>
      <input
        type="text"
        placeholder="search"
        className="input input-ghost input-sm w-full mx-2"
      />
    </div>
  );
}
