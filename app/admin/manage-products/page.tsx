import Container from "@/app/_components/ui/Container";
import ManageProductsClient from "./ManageProductsClient";
import NullData from "@/app/_components/NullData";
import React from "react";
import productServices from "@/server/services/api/productServices";
import userServices from "@/server/services/api/userServices";

const ManageProductsPage = async () => {
  const currentUser = await userServices.getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Unauthorize User." />;
  }

  const products = await productServices.getProducts({ category: null });

  return (
    <div>
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProductsPage;
