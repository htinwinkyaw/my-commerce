import { getCurrentUser } from "@/actions/getCurrentUser";
import FormWrap from "@/app/_components/FormWrap";
import NullData from "@/app/_components/NullData";
import React from "react";
import AddProductClient from "./AddProductClient";
import Container from "@/app/_components/Container";
import { getCategories } from "@/actions/getCategories";

const AddProductPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Cannot access this page." />;
  }

  const categories = await getCategories();

  return (
    <div>
      <Container>
        <FormWrap>
          <AddProductClient categories={categories} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProductPage;
