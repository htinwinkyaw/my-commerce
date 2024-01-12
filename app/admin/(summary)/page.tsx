import Container from "@/app/_components/Container";
import React from "react";
import SummaryClient from "./SummaryClient";
import { getGraphData } from "@/actions/getGraphData";
import orderServices from "@/server/services/orderServices";
import productServices from "@/server/services/productServices";
import userServices from "@/server/services/userServices";

const SummaryPage = async () => {
  const products = await productServices.getProducts({ category: null });
  const orders = await orderServices.getOrders();
  const users = await userServices.getAllUsers();
  const data = await getGraphData();

  return (
    <div className="mt-8">
      <Container>
        <SummaryClient
          data={data}
          products={products}
          orders={orders}
          users={users}
        />
      </Container>
    </div>
  );
};

export default SummaryPage;
