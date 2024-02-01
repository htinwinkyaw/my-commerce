"use client";

import { MdDelete, MdEdit } from "react-icons/md";
import React, { useState } from "react";

import ActionButton from "@/app/_components/ui/ActionButton";
import { Category } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  category: Category;
}

const CategoryItem: React.FC<Props> = ({ category }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCategoryEdit = async (categoryId: string) => {
    router.push(`/admin/manage-categories/edit/${categoryId}`);
  };

  const handleCategoryDelete = async (categoryId: string) => {
    setLoading(true);

    try {
      const response = await axios.delete(`/api/categories/${categoryId}`);

      if (response.data.status === 204) {
        toast.success(response.data.message);
        router.refresh();
      }

      if (response.data.status === 500) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-rows items-center justify-between p-3 text-slate-700 border-[1.5px] border-slate-300 rounded">
      <div>{category.name}</div>
      <div className="flex items-center justify-between gap-1">
        <ActionButton
          label="Edit"
          icon={MdEdit}
          onClick={handleCategoryEdit.bind(null, category.id)}
          disabled={loading}
        />
        <ActionButton
          label="Delete"
          icon={MdDelete}
          onClick={handleCategoryDelete.bind(null, category.id)}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default CategoryItem;
