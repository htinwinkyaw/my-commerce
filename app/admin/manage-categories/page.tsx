import Container from "@/app/_components/ui/Container";
import ManageCategoriesClient from "./ManageCategoriesClient";
import NullData from "@/app/_components/NullData";
import React from "react";
import categoryServices from "@/server/services/api/categoryServices";
import userServices from "@/server/services/api/userServices";

const ManageCategoriesPage = async () => {
  const currentUser = await userServices.getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Unauthorized user." />;
  }

  const categories = await categoryServices.getCategoriesWithoutAll();

  return (
    <div className="mt-8">
      <Container>
        <ManageCategoriesClient categories={categories} />
      </Container>
    </div>
  );
};

export default ManageCategoriesPage;
