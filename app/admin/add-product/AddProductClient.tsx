"use client";

import { Category } from "@prisma/client";
import FormWrap from "@/app/_components/ui/FormWrap";
import Heading from "@/app/_components/ui/Heading";
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
