import CheckoutClient from "./CheckoutClient";
import Container from "../_components/ui/Container";
import userServices from "@/server/services/api/userServices";

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
