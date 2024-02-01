import AddressChangeClient from "./AddressChangeClient";
import Container from "../../_components/ui/Container";
import addressServices from "@/server/services/api/addressServices";

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
