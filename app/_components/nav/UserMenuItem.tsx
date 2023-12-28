import React from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

const UserMenuItem: React.FC<Props> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-200 transition"
    >
      {children}
    </div>
  );
};

export default UserMenuItem;
