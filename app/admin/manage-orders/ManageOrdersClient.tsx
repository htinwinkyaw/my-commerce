import { Order, User } from "@prisma/client";
import React from "react";

interface Props {
  orders: ExtendedOrder[];
}
type ExtendedOrder = Order & {
  user: User;
};
const ManageOrdersClient: React.FC<Props> = ({ orders }) => {
  return <div>ManageOrdersClient</div>;
};

export default ManageOrdersClient;
