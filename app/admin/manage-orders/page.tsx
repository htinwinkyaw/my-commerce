import Container from "@/app/_components/Container";
import React from "react";
import ManageOrdersClient from "./ManageOrdersClient";
import { getOrders } from "@/actions/getOrders";
import NullData from "@/app/_components/NullData";

const ManageOrdersPage = async () => {
  const orders = await getOrders();

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
