import Container from "@/app/_components/ui/Container";
import ProductEditClient from "./ProductEditClient";
import React from "react";
import categoryServices from "@/server/services/api/categoryServices";
import productServices from "@/server/services/api/productServices";

const ProductEditPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const categories = await categoryServices.getCategoriesWithoutAll();
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
