import type { JSX } from "react";
import type { AlertType } from "../types/alert.type";

// Alert component to show messages and errors
function Alert({ text, cname = "" }: AlertType):JSX.Element {
  return (
    <p role="alert" className={`alert font ${cname} `}>
      {text}
    </p>
  );
}

export default Alert;
