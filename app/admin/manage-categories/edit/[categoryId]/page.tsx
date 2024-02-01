import CategoryForm from "../../CategoryForm";
import Container from "@/app/_components/ui/Container";
import NullData from "@/app/_components/NullData";
import React from "react";
import categoryServices from "@/server/services/api/categoryServices";
import userServices from "@/server/services/api/userServices";

interface IParams {
  params: { categoryId: string };
}

const EditCategoryPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const currentUser = await userServices.getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Unauthorized user." />;
  }

  const categoryId = params.categoryId;

  const category = await categoryServices.getCategoryById(categoryId);

  if (!category) {
    return <NullData title={`No category with ${categoryId} id.`} />;
  }

  return (
    <div className="mt-8">
      <Container>
        <CategoryForm category={category} title="Edit Category" />
      </Container>
    </div>
  );
};

export default EditCategoryPage;
