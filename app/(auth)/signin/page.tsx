import Container from "@/app/_components/Container";
import FormWrap from "@/app/_components/FormWrap";
import SignInClient from "./SignInClient";

const SignInPage = async () => {
  return (
    <Container>
      <FormWrap>
        <SignInClient />
      </FormWrap>
    </Container>
  );
};

export default SignInPage;
