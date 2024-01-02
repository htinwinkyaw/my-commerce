import { ExtendedProductType } from "@/types/products";
import React from "react";
import ProductItem from "./ProductItem";

interface Props {
  products: ExtendedProductType[];
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
