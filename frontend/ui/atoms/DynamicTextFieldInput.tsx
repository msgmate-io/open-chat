export default DynamicTextFieldInput;
import React, { createRef, useState } from "react";
import { StatusTypes } from "../../store/types";

function DynamicTextFieldInput({
  status,
  fieldValue,
  placeholder,
  onSubmit,
}: {
  status: StatusTypes;
  fieldValue: string;
  placeholder: string;
  onSubmit: (value: string) => void;
}) {
  const inputRef = createRef<HTMLInputElement>();
  const [changed, setChanged] = useState(false);

  const onChange = () => {
    if (inputRef.current?.value !== fieldValue) {
      if (!changed) {
        setChanged(true);
      }
    } else {
      if (changed) {
        setChanged(false);
      }
    }
  };

  const onClick = () => {
    console.log("clicked");
  };

  return (
    <label
      className={`input input-bordered ${
        status === StatusTypes.ERROR ? "input-error" : ""
      } flex items-center justify-end gap-2`}
    >
      <input
        className="grow bg-transparent"
        ref={inputRef}
        type="text"
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        defaultValue={fieldValue}
      />
      {changed && (
        <button className={`btn btn-sm btn-outline btn-success`}>save</button>
      )}
    </label>
  );
}
