export default FormSubmitButton;

import { StatusTypes } from "../../store/types";
import React from "react";

function FormSubmitButton({
  children,
  status,
  onClick,
}: {
  children: React.ReactNode;
  status: StatusTypes;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      className={`btn btn-primary w-full ${
        status === StatusTypes.LOADING ? "btn-disabled" : ""
      } ${status === StatusTypes.ERROR ? "btn-error btn-outline" : ""}`}
      onClick={onClick}
    >
      {status === StatusTypes.LOADING && (
        <span className="loading loading-spinner text-primary"></span>
      )}
      Login
    </button>
  );
}
