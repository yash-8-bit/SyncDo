import React from "react";
import type { ButtonType } from "../types/button.type";

function Button({ text, type = "button", func = () => {}, cname }: ButtonType) {
  return (
    <button type={type} onClick={func} className={`${cname}`}>
      {text}
    </button>
  );
}

export default Button;
