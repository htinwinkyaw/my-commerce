import { ExtendedProductType } from "@/types/product";
import NullData from "./NullData";
import ProductItem from "./ProductItem";
import React from "react";

interface Props {
  products: ExtendedProductType[] | null | undefined;
}

const ProductList: React.FC<Props> = ({ products }) => {
  if (!products || products.length === 0) {
    return <NullData title="No product is found. Remove filters." />;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
