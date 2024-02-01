import { Banner } from "@prisma/client";
import BannerForm from "../../BannerForm";
import React from "react";

interface Props {
  banner: Banner;
}

const EditBannerClient: React.FC<Props> = ({ banner }) => {
  return (
    <>
      <BannerForm banner={banner} />
    </>
  );
};

export default EditBannerClient;
