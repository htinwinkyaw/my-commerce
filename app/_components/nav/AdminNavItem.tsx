import React from "react";
import { IconType } from "react-icons";

interface Props {
  label: string;
  icon: IconType;
  selected: boolean;
}

const AdminNavItem: React.FC<Props> = ({ label, icon: Icon, selected }) => {
  return (
    <div
      className={`flex items-center justify-center text-center gap-1 p-2
      border-b-2 hover:text-slate-800 transition cursor-pointer
      ${
        selected
          ? "text-slate-800 border-b-slate-800"
          : "text-slate-500 border-transparent"
      }`}
    >
      <Icon size={18} />
      {label}
    </div>
  );
};

export default AdminNavItem;
