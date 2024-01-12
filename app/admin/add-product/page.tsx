import AddProductClient from "./AddProductClient";
import Container from "@/app/_components/Container";
import FormWrap from "@/app/_components/FormWrap";
import NullData from "@/app/_components/NullData";
import { ProductFormMode } from "@/types/enum";
import React from "react";
import { getCategories } from "@/actions/getCategories";
import { getCurrentUser } from "@/actions/getCurrentUser";

const AddProductPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Cannot access this page." />;
  }

  const categories = await getCategories();

  return (
    <div>
      <Container>
        <AddProductClient categories={categories} />
      </Container>
    </div>
  );
};

export default AddProductPage;
