"use client";

import { BsPlusCircleDotted } from "react-icons/bs";
import { Category } from "@prisma/client";
import CategoryItem from "./CategoryItem";
import Heading from "@/app/_components/ui/Heading";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  categories: Category[];
}

const ManageCategoriesClient: React.FC<Props> = ({ categories }) => {
  const router = useRouter();

  return (
    <div>
      <Heading title="Manage Categories" center />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 mt-8">
        {categories.map((category, i) => {
          return <CategoryItem key={i} category={category} />;
        })}
        <div
          onClick={() => {
            router.push("/admin/manage-categories/create");
          }}
          className="flex flex-rows items-center justify-center p-3 text-slate-700 border-[1.5px] border-slate-300 rounded cursor-pointer"
        >
          <BsPlusCircleDotted size={32} />
        </div>
      </div>
    </div>
  );
};

export default ManageCategoriesClient;
