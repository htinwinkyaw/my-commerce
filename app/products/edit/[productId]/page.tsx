import Container from "@/app/_components/Container";
import ProductEditClient from "./ProductEditClient";
import React from "react";
import { getCategories } from "@/actions/getCategories";
import { getProductById } from "@/actions/getProductById";

const ProductEditPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const categories = await getCategories();
  const product = await getProductById(params.productId);

  return (
    <div className="mt-8">
      <Container>
        <ProductEditClient categories={categories} product={product} />
      </Container>
    </div>
  );
};

export default ProductEditPage;
