import  { type JSX } from "react";
import type { ButtonType } from "../types/button.type";

// Button component 
function Button({ text, type = "button", func = () => {}, cname }: ButtonType):JSX.Element {
  return (
    <button type={type} onClick={func} className={`${cname}`}>
      {text}
    </button>
  );
}

export default Button;
