import { Banner as BannerType, Category } from "@prisma/client";

import Banner from "./Banner";
import CategoryNavList from "../_components/nav/CategoryNavList";
import Container from "../_components/ui/Container";
import { ExtendedProductType } from "@/types/product";
import ProductList from "../_components/ProductList";
import React from "react";

interface Props {
  products: ExtendedProductType[];
  banners: BannerType[];
  categories: Category[];
}

const HomeClient: React.FC<Props> = ({ products, categories, banners }) => {
  return (
    <div>
      <CategoryNavList categories={categories} />
      <div className="p-4 lg:p-8">
        <Container>
          {banners.length > 0 && (
            <div className="mx-auto mb-2 w-[100%] h-[170px] sm:h-[200px] md:h-[250px] lg:h-[300px]">
              <Banner banners={banners} />
            </div>
          )}

          <ProductList products={products} />
        </Container>
      </div>
    </div>
  );
};

export default HomeClient;
