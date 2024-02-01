import { Category, Product } from "@prisma/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";

import Button from "@/app/_components/ui/Button";
import Checkbox from "./Checkbox";
import Input from "@/app/_components/ui/Input";
import SelectCategory from "./SelectCategory";
import TextArea from "./TextArea";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadImage } from "@/app/_utils/uploadImage";
import { useRouter } from "next/navigation";

interface Props {
  categories: Category[];
  product?: Product;
}

const ProductForm: React.FC<Props> = ({ product, categories }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      image: product ? product.image : "",
      name: product ? product.name : "",
      price: product ? product.price : "",
      category: product ? product.categoryId : "default",
      description: product ? product.description : "",
      brand: product ? product.brand : "",
      inStock: product ? product.inStock : "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    if (data.category === "default") {
      setLoading(false);
      toast.error("Choose a product category.");

      return;
    }

    const downloadURL = await uploadImage(data, "/products");

    const updatedData = { ...data, image: downloadURL };

    try {
      const endpoint = product
        ? `/api/products/${product.id}`
        : "/api/products";

      const response = product
        ? await axios.put(endpoint, data)
        : await axios.post(endpoint, updatedData);

      if (response.data.status === 200 || response.data.status === 201) {
        toast.success(response.data.message);
      }

      reset();
      router.push("/admin/manage-products");
      router.refresh();
    } catch (error) {
      toast.error(`Failed to ${product ? "update" : "create"} product.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        id="image"
        accept="image/*"
        disabled={loading}
        {...register("image", { required: true })}
        className="w-full cursor-pointer border-[1.5px] p-[-1.5px] border-slate-400 rounded
        file:p-4 file:bg-slate-700 file:text-slate-200  file:rounded-l
        disabled:cursor-not-allowed"
      />
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

      <div className="flex flex-row justify-between gap-2 w-full">
        <Button
          label="Cancel"
          onClick={() => {
            router.back();
          }}
          outline
          disabled={loading}
        />
        <Button
          label={
            loading
              ? product
                ? "Updating..."
                : "Adding..."
              : product
              ? "Update Product"
              : "Add New Product"
          }
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        />
      </div>
    </>
  );
};

export default ProductForm;
