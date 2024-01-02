import Container from "@/app/_components/Container";
import React from "react";
import ProductDetailClient from "./ProductDetailClient";
import { getProductById } from "@/actions/getProductById";

interface Props {
  params: { productId: string };
}

const ProductDetailPage: React.FC<Props> = async ({ params }) => {
  const product = await getProductById(params.productId);

  return (
    <div className="pt-8">
      <Container>
        <ProductDetailClient product={product} />
      </Container>
    </div>
  );
};

export default ProductDetailPage;
