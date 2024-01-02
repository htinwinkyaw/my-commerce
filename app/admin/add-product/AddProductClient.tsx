"use client";

import Button from "@/app/_components/Button";
import Heading from "@/app/_components/Heading";
import Input from "@/app/_components/Input";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "./TextArea";
import Checkbox from "./Checkbox";
import SelectCategory from "./SelectCategory";
import { Category } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  categories: Category[];
}

const AddProductClient: React.FC<Props> = ({ categories }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      brand: "",
      inStock: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    if (data.category === "") {
      setLoading(false);
      toast.error("Choose a product category.");

      return;
    }

    try {
      axios
        .post("/api/products", data)
        .then((res) => {
          toast.success("New product is added.");
          router.push("/admin/manage-products");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to add new product.");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Heading title="Add New Product" center />

      <Input
        id="name"
        label="Name"
        control={control}
        register={register}
        errors={errors}
        disabled={loading}
        required
      />
      <Input
        id="price"
        label="Price"
        type="number"
        control={control}
        register={register}
        errors={errors}
        disabled={loading}
        required
      />
      <SelectCategory
        id="category"
        name="category"
        register={register}
        categories={categories}
      />
      <TextArea
        id="description"
        label="Description"
        register={register}
        errors={errors}
        disabled={loading}
        required
      />
      <Input
        id="brand"
        label="Brand"
        control={control}
        register={register}
        errors={errors}
        disabled={loading}
        required
      />
      <Checkbox
        id="inStock"
        label="This product is in stock."
        register={register}
        disabled={loading}
      />
      <Button
        label={loading ? "Adding..." : "Add New Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductClient;
