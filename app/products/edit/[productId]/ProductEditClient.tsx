"use client";

import { Category, Product } from "@prisma/client";

import FormWrap from "@/app/_components/FormWrap";
import Heading from "@/app/_components/Heading";
import NullData from "@/app/_components/NullData";
import ProductForm from "@/app/admin/add-product/ProductForm";
import React from "react";

interface Props {
  categories: Category[];
  product: Product | undefined | null;
}

const ProductEditClient: React.FC<Props> = ({ categories, product }) => {
  if (!product) {
    return <NullData title="Oops! No product is found." />;
  }
  return (
    <div>
      <FormWrap>
        <Heading title="Update Product" />
        <ProductForm categories={categories} product={product} />
      </FormWrap>
    </div>
  );
};

export default ProductEditClient;
