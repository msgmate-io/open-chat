export default FieldErrorDisplay;

import React from "react";
import { StatusTypes } from "../../store/types";

function FieldErrorDisplay({
  errors,
  status,
  fieldName = "non_field_errors",
}: {
  errors: {
    [fieldName: string]: string[];
  };
  status: StatusTypes;
  fieldName?: string;
}) {
  const fieldErrors = errors ? errors[fieldName] || [] : [];
  return (
    <div className="text-xs text-error w-full h-3">
      {fieldErrors.join(", ")}
    </div>
  );
}
