import Container from "@/app/_components/ui/Container";
import FormWrap from "@/app/_components/ui/FormWrap";
import React from "react";
import SignUpClient from "./SignUpClient";
import userServices from "@/server/services/api/userServices";

const SignUpPage = async () => {
  const currentUser = await userServices.getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <SignUpClient user={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default SignUpPage;
