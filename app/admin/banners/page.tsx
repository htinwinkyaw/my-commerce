import BannersClient from "./BannersClient";
import Container from "@/app/_components/ui/Container";
import NullData from "@/app/_components/NullData";
import React from "react";
import bannerServices from "@/server/services/api/bannerServices";
import userServices from "@/server/services/api/userServices";

const AddBannerPage = async () => {
  const currentUser = await userServices.getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Unauthorized user." />;
  }
  const banners = await bannerServices.getBanners();

  return (
    <div className="mt-8">
      <Container>
        <BannersClient banners={banners} />
      </Container>
    </div>
  );
};

export default AddBannerPage;
