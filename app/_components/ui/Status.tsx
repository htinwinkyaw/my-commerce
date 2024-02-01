import React from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  label: string;
  textColor: string;
  bgColor: string;
}

const Status: React.FC<Props> = ({ icon: Icon, label, textColor, bgColor }) => {
  return (
    <div
      className={`flex items-center justify-center gap-1 p-1 rounded-md 
      ${textColor} ${bgColor}`}
    >
      {label}
      <Icon size={18} />
    </div>
  );
};

export default Status;
