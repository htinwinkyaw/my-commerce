import Container from "@/app/_components/ui/Container";
import FormWrap from "@/app/_components/ui/FormWrap";
import SignInClient from "./SignInClient";
import userServices from "@/server/services/api/userServices";

const SignInPage = async () => {
  const currentUser = await userServices.getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <SignInClient user={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default SignInPage;
