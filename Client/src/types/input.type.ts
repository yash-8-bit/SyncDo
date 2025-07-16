import type { ChangeEvent } from "react";

//  normal input interface
export interface InputType {
  heading?: string;
  value: string;
  type?: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

//  option-select input interface
export interface SelecType {
  heading?: string;
  value: string;
  options: string[];
  onchange: (e: ChangeEvent<HTMLSelectElement>) => void;
}
