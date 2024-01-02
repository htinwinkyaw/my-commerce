import React from "react";
import Container from "../_components/Container";
import CartClient from "./CartClient";
import { getCurrentUser } from "@/actions/getCurrentUser";

const CartPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="mt-8">
      <Container>
        <CartClient user={currentUser} />
      </Container>
    </div>
  );
};

export default CartPage;
