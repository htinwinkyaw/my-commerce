import Container from "@/app/_components/ui/Container";
import ProductDetailClient from "./ProductDetailClient";
import React from "react";
import productServices from "@/server/services/api/productServices";

interface Props {
  params: { productId: string };
}

const ProductDetailPage: React.FC<Props> = async ({ params }) => {
  const product = await productServices.getProductDetailById(params.productId);

  return (
    <div className="pt-8">
      <Container>
        <ProductDetailClient product={product} />
      </Container>
    </div>
  );
};

export default ProductDetailPage;
