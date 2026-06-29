import { forwardRef, InputHTMLAttributes } from "react";
import { Input } from "../ui/input";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

function CustomInput({ label, error, ...props }: InputProps, ref: React.Ref<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-link ">{label}</label>
      <Input ref={ref} {...props} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default forwardRef(CustomInput);