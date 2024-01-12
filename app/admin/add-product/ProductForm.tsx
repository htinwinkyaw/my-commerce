import { Category, Product } from "@prisma/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";

import Button from "@/app/_components/Button";
import Checkbox from "./Checkbox";
import Input from "@/app/_components/Input";
import SelectCategory from "./SelectCategory";
import TextArea from "./TextArea";
import axios from "axios";
import toast from "react-hot-toast";
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
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: product ? product.name : "",
      price: product ? product.price : "",
      category: product ? product.categoryId : "",
      description: product ? product.description : "",
      brand: product ? product.brand : "",
      inStock: product ? product.inStock : "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    if (data.category === "") {
      setLoading(false);
      toast.error("Choose a product category.");

      return;
    }

    try {
      const endpoint = product
        ? `/api/products/${product.id}`
        : "/api/products";

      product
        ? await axios.put(endpoint, data)
        : await axios.post(endpoint, data);

      toast.success(`Product is ${product ? "updated" : "created"}.`);

      router.back();
      router.refresh();
    } catch (error) {
      toast.error(`Failed to ${product ? "update" : "create"} product.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
