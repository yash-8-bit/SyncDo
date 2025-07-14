import type { AlertType } from "../types/alert.type";

function Alert({ text, cname = "" }: AlertType) {
  return (
    <p role="alert" className={`alert font ${cname} `}>
      {text}
    </p>
  );
}

export default Alert;
