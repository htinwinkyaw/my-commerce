import React from "react";
import SignInClient from "./SignInClient";
import Container from "@/app/_components/Container";
import FormWrap from "@/app/_components/FormWrap";
import { getCurrentUser } from "@/actions/getCurrentUser";

const SignInPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <SignInClient />
      </FormWrap>
    </Container>
  );
};

export default SignInPage;
