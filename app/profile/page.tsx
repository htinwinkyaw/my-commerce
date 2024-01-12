import Container from "../_components/Container";
import NullData from "../_components/NullData";
import ProfileClient from "./ProfileClient";
import React from "react";
import userServices from "@/server/services/userServices";

const ProfilePage = async () => {
  const currentUser = await userServices.getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! You have to login first." />;
  }

  const user = await userServices.getCurrentUserDetail();

  return (
    <div className="mt-8">
      <Container>
        <ProfileClient user={user} />
      </Container>
    </div>
  );
};

export default ProfilePage;
