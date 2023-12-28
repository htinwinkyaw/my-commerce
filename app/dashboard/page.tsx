import { getCurrentUser } from "@/actions/getCurrentUser";

const DashboardPage = async () => {
  const currentUser = await getCurrentUser();

  return <div>{currentUser ? currentUser.email : "Dashboard"}</div>;
};

export default DashboardPage;
