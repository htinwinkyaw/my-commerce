import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

const Checkbox: React.FC<Props> = ({ id, label, disabled, register }) => {
  return (
    <div className="flex items-center gap-2 w-full text-slate-600">
      <input
        type="checkbox"
        id={id}
        {...register(id)}
        autoComplete="off"
        placeholder=""
        className="cursor-pointer"
      />
      <label htmlFor={id} className="font-medium cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
