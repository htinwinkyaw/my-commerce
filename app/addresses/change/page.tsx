import AddressChangeClient from "./AddressChangeClient";
import Container from "../../_components/Container";
import addressServices from "@/server/services/addressServices";

const AddressChangePage = async () => {
  const addresses = await addressServices.getAddressesByUserId();

  return (
    <div>
      <Container>
        <AddressChangeClient addresses={addresses} />
      </Container>
    </div>
  );
};

export default AddressChangePage;
