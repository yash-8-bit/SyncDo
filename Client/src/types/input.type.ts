import type { ChangeEvent } from "react";

export interface InputType {
  heading?: string;
  value: string;
  type?: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SelecType {
  heading?: string;
  value: string;
  options: string[];
  onchange: (e: ChangeEvent<HTMLSelectElement>) => void;
}
