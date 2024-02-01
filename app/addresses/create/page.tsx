import AddressForm from "@/app/profile/AddressForm";
import Container from "@/app/_components/ui/Container";
import FormWrap from "@/app/_components/ui/FormWrap";
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
