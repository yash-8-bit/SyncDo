export interface InputType {
  heading?: string;
  value: string;
  type?: string;
  placeholder: string;
  cname?: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
