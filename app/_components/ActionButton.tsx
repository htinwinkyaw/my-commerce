import React from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  label: string;
  disabled: boolean;
  onClick: () => void;
}

const ActionButton: React.FC<Props> = ({
  icon: Icon,
  label,
  disabled,
  onClick,
}) => {
  return (
    <>
      <button
        data-tooltip-target="tooltip animation"
        onClick={onClick}
        className={`flex items-center justify-center w-[40px] h-[30px] cursor-pointer
    border border-slate-400 rounded text-slate-700
    ${disabled && "opacity-70 cursor-not-allowed"}`}
      >
        <Icon size={18} />
      </button>
    </>
  );
};

export default ActionButton;
