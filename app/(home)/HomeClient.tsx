import Banner from "./Banner";
import Container from "../_components/Container";
import { ExtendedProductType } from "@/types/product";
import Image from "next/image";
import ProductList from "../_components/ProductList";
import React from "react";

interface Props {
  products: ExtendedProductType[];
}

const HomeClient: React.FC<Props> = ({ products }) => {
  return (
    <div className="p-4 lg:p-8">
      <Container>
        <div className="mb-2 md:mb-4 xl:mb-6">
          <Banner />
        </div>
        <ProductList products={products} />
      </Container>
    </div>
  );
};

export default HomeClient;
