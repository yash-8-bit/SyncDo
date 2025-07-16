type buttontype = "button" | "submit";

// button interface
export interface ButtonType {
  text: string;
  func?: () => void;
  type?: buttontype;
  cname?: string;
}
