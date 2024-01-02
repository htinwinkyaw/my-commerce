import React from "react";
import Container from "../_components/Container";
import ProductsClient from "./ProductsClient";
import { getProducts } from "@/actions/getProducts";
import ProductList from "../_components/ProductList";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="p-8">
      <Container>
        <ProductList products={products} />
      </Container>
    </div>
  );
};

export default ProductsPage;
