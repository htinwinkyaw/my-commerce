export const revalidate = 0;

import HomeClient from "./HomeClient";
import { IProductParams } from "@/types/product";
import categoryServices from "@/server/services/categoryServices";
import productServices from "@/server/services/productServices";

interface Props {
  searchParams: IProductParams;
}

const HomePage = async ({ searchParams }: Props) => {
  const products = await productServices.getProducts(searchParams);
  const categories = await categoryServices.getCategories();

  return <HomeClient products={products} categories={categories} />;
};

export default HomePage;
