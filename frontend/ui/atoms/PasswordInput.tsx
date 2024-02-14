export default PasswordInput;

import React, { useState } from "react";

function PasswordInput({ inputRef }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className="input sm:input-lg input-bordered flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
          clipRule="evenodd"
        />
      </svg>
      {showPassword ? (
        <input
          className="grow bg-transparent"
          placeholder={inputRef.current.value}
        />
      ) : (
        <input
          ref={inputRef}
          type="password"
          className="grow bg-transparent"
          placeholder="Password"
        />
      )}
      <button
        className={`btn btn-sm border-2 ${
          showPassword ? "btn-primary" : "border-primary"
        }`}
        onClick={(e) => {
          // if the button is released hide the password, else show it
          setShowPassword(!showPassword);
          console.log(inputRef.current.value);
        }}
      >
        view
      </button>
    </label>
  );
}
