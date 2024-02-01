import AddProductClient from "./AddProductClient";
import Container from "@/app/_components/ui/Container";
import NullData from "@/app/_components/NullData";
import React from "react";
import categoryServices from "@/server/services/api/categoryServices";
import userServices from "@/server/services/api/userServices";

const AddProductPage = async () => {
  const currentUser = await userServices.getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Cannot access this page." />;
  }

  const categories = await categoryServices.getCategoriesWithoutAll();

  return (
    <div>
      <Container>
        <AddProductClient categories={categories} />
      </Container>
    </div>
  );
};

export default AddProductPage;
