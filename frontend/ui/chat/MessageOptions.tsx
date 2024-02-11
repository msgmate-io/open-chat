export default MessageOptions;
import React from "react";

function MessageOptions({ message }) {
  return (
    <div className="dropdown dropdown-end absolute right-0 z-20">
      <div
        className={`btn btn-circle btn-xs hidden group-hover:block`}
        tabIndex={0}
        role="button"
      >
        <kbd className="kbd kbd-sm bg-primary">▼</kbd>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu shadow bg-base-100 w-52 gap-1 rounded-xl border"
      >
        <button className="btn btn-xs">Item 1</button>
        <button className="btn btn-xs">Item 1</button>
      </ul>
    </div>
  );
}
