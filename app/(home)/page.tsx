export const revalidate = 0;

import HomeClient from "./HomeClient";
import { IProductParams } from "@/types/product";
import bannerServices from "@/server/services/api/bannerServices";
import categoryServices from "@/server/services/api/categoryServices";
import productServices from "@/server/services/api/productServices";

interface Props {
  searchParams: IProductParams;
}

const HomePage = async ({ searchParams }: Props) => {
  const products = await productServices.getProducts(searchParams);
  const categories = await categoryServices.getCategories();
  const banners = await bannerServices.getActiveBanners();

  return (
    <HomeClient products={products} categories={categories} banners={banners} />
  );
};

export default HomePage;
