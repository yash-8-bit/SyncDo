type buttontype = "button" | "submit";

export interface ButtonType {
  text: string;
  func?: () => void;
  type?: buttontype;
  cname?: string;
}
