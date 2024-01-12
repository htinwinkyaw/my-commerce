"use client";

import { Category, Product } from "@prisma/client";

import FormWrap from "@/app/_components/FormWrap";
import Heading from "@/app/_components/Heading";
import ProductForm from "./ProductForm";

interface Props {
  categories: Category[];
}

const AddProductClient: React.FC<Props> = ({ categories }) => {
  return (
    <>
      <FormWrap>
        <Heading title="Add New Product" center />

        <ProductForm categories={categories} />
      </FormWrap>
    </>
  );
};

export default AddProductClient;
