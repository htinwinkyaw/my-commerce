import Container from "@/app/_components/ui/Container";
import ManageOrdersClient from "./ManageOrdersClient";
import NullData from "@/app/_components/NullData";
import React from "react";
import orderServices from "@/server/services/api/orderServices";
import userServices from "@/server/services/api/userServices";

const ManageOrdersPage = async () => {
  const currentUser = await userServices.getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Unauthorized user." />;
  }

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
