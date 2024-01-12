import Container from "@/app/_components/Container";
import FormWrap from "@/app/_components/FormWrap";
import AddressForm from "@/app/profile/AddressForm";
import React from "react";

const NewAddressPage = () => {
  return (
    <div>
      <Container>
        <FormWrap>
          <AddressForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default NewAddressPage;
