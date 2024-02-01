import BannerForm from "../BannerForm";
import Container from "@/app/_components/ui/Container";
import React from "react";

const CreateBannerPage = () => {
  return (
    <div className="mt-8">
      <Container>
        <BannerForm />
      </Container>
    </div>
  );
};

export default CreateBannerPage;
