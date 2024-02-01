import Container from "../_components/ui/Container";
import ProductList from "../_components/ProductList";
import React from "react";
import productServices from "@/server/services/api/productServices";

const ProductsPage = async () => {
  const products = await productServices.getProducts({ category: null });

  return (
    <div className="p-8">
      <Container>
        <ProductList products={products} />
      </Container>
    </div>
  );
};

export default ProductsPage;
