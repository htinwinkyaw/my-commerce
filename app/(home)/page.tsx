import HomeClient from "./HomeClient";
import { ProductParams } from "@/types/product";
import productServices from "@/server/services/productServices";

interface IParams {
  searchParams: ProductParams;
}

const HomePage = async ({ searchParams }: IParams) => {
  const products = await productServices.getProducts(searchParams);

  return <HomeClient products={products} />;
};

export default HomePage;
