export default UsernameInput;

import React from "react";
import { StatusTypes } from "../../store/types";

import FieldErrorDisplay from "./FieldErrorDisplay";

function UsernameInput({
  inputRef,
  status,
  errors,
  fieldName = "username",
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  status: StatusTypes;
  // object string -> list
  errors: { [key: string]: string[] };
  fieldName?: string;
}) {
  return (
    <>
      <label
        className={`input sm:input-lg input-bordered ${
          status === StatusTypes.ERROR ? "input-error" : ""
        } flex items-center gap-2`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow bg-transparent"
          placeholder="Username"
          ref={inputRef}
        />
      </label>
      <FieldErrorDisplay
        errors={errors}
        status={status}
        fieldName={fieldName}
      />
    </>
  );
}
