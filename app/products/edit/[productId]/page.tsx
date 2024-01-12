import Container from "@/app/_components/Container";
import ProductEditClient from "./ProductEditClient";
import React from "react";
import categoryServices from "@/server/services/categoryServices";
import productServices from "@/server/services/productServices";

const ProductEditPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const categories = await categoryServices.getCategories();
  const product = await productServices.getProductById(params.productId);

  return (
    <div className="mt-8">
      <Container>
        <ProductEditClient categories={categories} product={product} />
      </Container>
    </div>
  );
};

export default ProductEditPage;
