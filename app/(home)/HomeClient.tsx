import Banner from "./Banner";
import { Category } from "@prisma/client";
import CategoryNavList from "../_components/nav/CategoryNavList";
import Container from "../_components/Container";
import { ExtendedProductType } from "@/types/product";
import ProductList from "../_components/ProductList";
import React from "react";

interface Props {
  products: ExtendedProductType[];
  categories: Category[];
}

const HomeClient: React.FC<Props> = ({ products, categories }) => {
  return (
    <div>
      <CategoryNavList categories={categories} />
      <div className="p-4 lg:p-8">
        <Container>
          <div className="mb-2 md:mb-4 xl:mb-6">
            <Banner />
          </div>
          <ProductList products={products} />
        </Container>
      </div>
    </div>
  );
};

export default HomeClient;
