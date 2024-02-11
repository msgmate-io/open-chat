export default ChatInput;

import React from "react";

function ChatInput({}) {
  return (
    <div className="bg-base-200 h-fit flex flex-row w-full rounded-xl mt-2 border p-2 gap-2">
      <textarea
        className="textarea flex flex-grow"
        placeholder="Send a message"
      ></textarea>
      <div className="flex flex-row content-center items-center justify-end">
        <button className="btn btn-lg bg-base-100">Large</button>
      </div>
    </div>
  );
}
