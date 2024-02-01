import CartClient from "./CartClient";
import Container from "../_components/ui/Container";
import React from "react";
import userServices from "@/server/services/api/userServices";

const CartPage = async () => {
  const currentUser = await userServices.getCurrentUser();

  return (
    <div className="mt-8">
      <Container>
        <CartClient user={currentUser} />
      </Container>
    </div>
  );
};

export default CartPage;
