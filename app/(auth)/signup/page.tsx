import React from "react";
import Container from "@/app/_components/Container";
import FormWrap from "@/app/_components/FormWrap";
import SignUpClient from "./SignUpClient";

const SignUpPage = () => {
  return (
    <Container>
      <FormWrap>
        <SignUpClient />
      </FormWrap>
    </Container>
  );
};

export default SignUpPage;
