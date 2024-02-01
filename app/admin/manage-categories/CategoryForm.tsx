"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";

import Button from "@/app/_components/ui/Button";
import { Category } from "@prisma/client";
import FormWrap from "@/app/_components/ui/FormWrap";
import Heading from "@/app/_components/ui/Heading";
import Input from "@/app/_components/ui/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  category?: Category;
  title: string;
}

const CategoryForm: React.FC<Props> = ({ category, title }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: category ? category.name : "'" },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    try {
      const response = category
        ? await axios.put(`/api/categories/${category.id}`, { name: data.name })
        : await axios.post("/api/categories", { name: data.name });

      if (response.data.status === 200 || response.data.status === 201) {
        toast.success(response.data.message);

        router.push("/admin/manage-categories");
        router.refresh();
      }

      if (response.data.status === 500) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. (FORM)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrap>
      <Heading title={title} />

      <Input
        label="Category Name"
        id="name"
        control={control}
        register={register}
        errors={errors}
        disabled={loading}
        required
      />
      <div className="flex flex-row items-center gap-1 w-full">
        <Button
          label="Cancel"
          disabled={loading}
          outline
          onClick={() => {
            router.back();
          }}
        />
        <Button
          label={
            loading
              ? category
                ? "Updating"
                : "Adding"
              : category
              ? "Update Category"
              : "Add Category"
          }
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </FormWrap>
  );
};

export default CategoryForm;
