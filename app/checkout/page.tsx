import CheckoutClient from "./CheckoutClient";
import Container from "../_components/Container";
import userServices from "@/server/services/userServices";

const CheckoutPage = async () => {
  const user = await userServices.getCurrentUserDetail();

  return (
    <div className="pt-8">
      <Container>
        <CheckoutClient user={user} />
      </Container>
    </div>
  );
};

export default CheckoutPage;
