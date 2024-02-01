"use client";

import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface Props {
  label: string;
  type?: string;
  id: string;
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  control: Control;
  errors: FieldErrors;
}

const Input: React.FC<Props> = ({
  label,
  type,
  id,
  required,
  disabled,
  register,
  control,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        type={type ? type : "text"}
        id={id}
        {...register(id, { required })}
        required={required}
        disabled={disabled}
        placeholder=""
        autoComplete="off"
        className={`
          peer p-4 pt-6 w-full font-light transition cursor-text
          outline-none border-2 rounded-md bg-white placeholder-transparent
          disabled:opacity-70 disabled:cursor-not-allowed
          ${
            errors[id]
              ? "text-rose-400 border-rose-400 focus:border-rose-400"
              : "text-slate-600 border-slate-300 focus:border-slate-300"
          }
        `}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 top-2 text-sm cursor-text
        peer-placeholder-shown:text-base peer-placeholder-shown:top-6
        peer-focus:text-sm peer-focus:top-2
        ${errors[id] ? "text-rose-400" : "text-slate-400"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
