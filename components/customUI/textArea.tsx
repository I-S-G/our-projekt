import {forwardRef, TextareaHTMLAttributes } from "react";
import { Textarea } from "../ui/textarea";
import { FieldError } from "react-hook-form";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

function CustomTextArea({ label, error, ...props }: TextAreaProps, ref: React.Ref<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col font-link gap-1">
      <label>{label}</label>
      <Textarea ref= {ref} {...props} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default forwardRef(CustomTextArea);
