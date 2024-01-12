import Container from "@/app/_components/Container";
import ManageProductsClient from "./ManageProductsClient";
import NullData from "@/app/_components/NullData";
import React from "react";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getProducts from "@/actions/getProducts";

const ManageProductsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Unauthorize User." />;
  }

  const products = await getProducts({ category: null });

  return (
    <div>
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProductsPage;
