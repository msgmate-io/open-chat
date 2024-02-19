export default RouterFallbackElement;
import React from "react";

function RouterFallbackElement() {
  return (
    <div className="-z-50 absolute w-screen h-screen flex items-center content-center justify-center">
      <div className="w-80 h-80 bg-primary rounded-full animate-bounce"></div>;
    </div>
  );
}
