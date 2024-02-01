import CategoryForm from "../CategoryForm";
import Container from "@/app/_components/ui/Container";
import React from "react";

const CreateCategoryPage = () => {
  return (
    <div className="mt-8">
      <Container>
        <CategoryForm title="Create New Category" />
      </Container>
    </div>
  );
};

export default CreateCategoryPage;
