import Container from "../_components/Container";
import NullData from "../_components/NullData";
import OrdersClient from "./OrdersClient";
import orderServices from "@/server/services/orderServices";
import userServices from "@/server/services/userServices";

const OrdersPage = async () => {
  const currentUser = await userServices.getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! You have to sign in first." />;
  }

  const orders = await orderServices.getOrdersByUserId(currentUser.id);

  return (
    <div>
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default OrdersPage;
