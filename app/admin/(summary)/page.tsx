import Container from "@/app/_components/ui/Container";
import NullData from "@/app/_components/NullData";
import React from "react";
import SummaryClient from "./SummaryClient";
import { getGraphData } from "@/actions/getGraphData";
import orderServices from "@/server/services/api/orderServices";
import productServices from "@/server/services/api/productServices";
import userServices from "@/server/services/api/userServices";

const SummaryPage = async () => {
  const currentUser = await userServices.getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Unauthorized user." />;
  }

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
