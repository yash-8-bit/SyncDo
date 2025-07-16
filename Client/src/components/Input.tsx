import{ type JSX } from "react";
import type { InputType } from "../types/input.type";


// Input component
function Input({
  heading = "",
  type = "text",
  value,
  placeholder,
  onchange,
}: InputType):JSX.Element {
  return (
    <div className="form-group">
      <label>{heading}</label>
      <input
        type={type}
        className="inp"
        value={value}
        placeholder={placeholder}
        onChange={onchange}
        required
      />
    </div>
  );
}

export default Input;
