import React from "react";
import ManageProductsClient from "./ManageProductsClient";
import { getProducts } from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/_components/NullData";
import Container from "@/app/_components/Container";

const ManageProductsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Unauthorize User." />;
  }

  const products = await getProducts();

  return (
    <div>
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProductsPage;
