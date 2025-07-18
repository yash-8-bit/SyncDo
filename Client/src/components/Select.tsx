import type { JSX } from "react";
import type { SelecType } from "../types/input.type";


// Option-Select Input  
function Select({ heading = "", value, onchange, options }: SelecType):JSX.Element {
  return (
    <div className="form-group">
      <label>{heading}</label>
      <select value={value} onChange={onchange} className="inp">
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
