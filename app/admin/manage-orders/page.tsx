import Container from "@/app/_components/Container";
import React from "react";
import ManageOrdersClient from "./ManageOrdersClient";
import { getOrders } from "@/actions/getOrders";

const ManageOrdersPage = async () => {
  const orders = await getOrders();

  return (
    <div>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrdersPage;
