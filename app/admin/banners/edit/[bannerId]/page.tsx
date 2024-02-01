import Container from "@/app/_components/ui/Container";
import EditBannerClient from "./EditBannerClient";
import React from "react";
import bannerServices from "@/server/services/api/bannerServices";

interface Props {
  params: { bannerId: string };
}

const EditBannerPage: React.FC<Props> = async ({ params }) => {
  const bannerId = params.bannerId;

  const banner = await bannerServices.getBannerById(bannerId);

  return (
    <div>
      <Container>
        <EditBannerClient banner={banner} />
      </Container>
    </div>
  );
};

export default EditBannerPage;
