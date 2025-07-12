import React from "react";
import type { InputType } from "../types/input.type";

function Input({
  heading = "",
  type = "text",
  value,
  placeholder,
  onchange,
}: InputType) {
  return (
    <div className="form-group">
      <label >{heading}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onchange}
        required
      />
    </div>
  );
}

export default Input;
