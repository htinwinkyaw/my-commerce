import { FieldValues, SubmitHandler, UseFormRegister } from "react-hook-form";

import { Category } from "@prisma/client";
import React from "react";

interface Props {
  id: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  categories: Category[];
}

const SelectCategory: React.FC<Props> = ({ id, register, categories }) => {
  return (
    <div className="w-full">
      <select
        id={id}
        {...register(id, { required: true })}
        className="w-full p-4 text-slate-600 border-2 border-slate-300 rounded-md outline-none"
      >
        <option value="default">-- Select a category --</option>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectCategory;
