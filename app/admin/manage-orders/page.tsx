import Container from "@/app/_components/Container";
import ManageOrdersClient from "./ManageOrdersClient";
import NullData from "@/app/_components/NullData";
import React from "react";
import orderServices from "@/server/services/orderServices";

const ManageOrdersPage = async () => {
  const orders = await orderServices.getDetailOrders();

  if (!orders || orders.length === 0) {
    return <NullData title="Oops! No order is found." />;
  }

  return (
    <div>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrdersPage;
