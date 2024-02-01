import AddressForm from "@/app/profile/AddressForm";
import Container from "@/app/_components/ui/Container";
import FormWrap from "@/app/_components/ui/FormWrap";
import React from "react";
import addressServices from "@/server/services/api/addressServices";

const EditAddress = async ({ params }: { params: { addressId: string } }) => {
  const address = await addressServices.getAddressByAddressId(params.addressId);

  return (
    <div>
      <Container>
        <FormWrap>
          <AddressForm address={address} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default EditAddress;
