import React from "react";
import AdminNav from "../_components/nav/AdminNav";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div>
        <AdminNav />
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
