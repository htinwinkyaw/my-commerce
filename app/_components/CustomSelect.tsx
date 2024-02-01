"use client";

import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import React, { ChangeEvent, useCallback, useEffect } from "react";

import { AddressFormMode } from "@/types/enum";

interface CustomSelectProps {
  mode: AddressFormMode;
  label: string;
  id: string;
  options: string[];
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  control: Control<FieldValues, any>;
  setValue: UseFormSetValue<FieldValues>;
  disabled: boolean;
  onSelect?: (option: string) => void;
  defaultValue?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  mode,
  label,
  id,
  options,
  register,
  errors,
  control,
  setValue,
  disabled,
  onSelect,
  defaultValue,
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue(id, value);

    if (onSelect) {
      onSelect(value);
    }
  };

  const selectedValue = useWatch({ control, name: id });

  useEffect(() => {
    if (defaultValue) {
      setValue(id, defaultValue);
    }
  }, [setValue, id, defaultValue]);

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`pl-1 ${errors[id] ? "text-rose-400" : "text-slate-400"}`}
      >
        {label}
      </label>

      <select
        id={id}
        {...register(id, { required: true })}
        onChange={handleChange}
        value={selectedValue}
        disabled={disabled}
        className={`w-full p-4 text-slate-600 border-2 rounded-md cursor-pointer ${
          errors[id] ? "border-rose-400" : "border-slate-300"
        }`}
      >
        <option value="default">{label}</option>
        {options.map((option, i) => {
          return (
            <option key={i} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CustomSelect;
