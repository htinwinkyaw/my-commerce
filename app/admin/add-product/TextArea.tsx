import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled: boolean;
  required: boolean;
}

const TextArea: React.FC<Props> = ({
  id,
  label,
  register,
  errors,
  disabled,
  required,
}) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        placeholder=""
        disabled={disabled}
        {...register(id, { required })}
        className={`
        peer p-4 pt-6 w-full border-2 outline-none  min-h-[150px] max-h-[150px] rounded-md transition
        ${
          errors[id]
            ? "text-rose-400 border-rose-400 focus:border-rose-400"
            : "text-slate-600 border-slate-300 focus:border-slate-300"
        }
        `}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-sm text-slate-400 font-light
        disabled:opacity-70 disabled:cursor-not-allowed
        peer-placeholder-shown:text-base 
        peer-placeholder-shown:top-5
        peer-focus:text-sm
        peer-focus:top-2"
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
