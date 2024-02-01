import React from "react";
import { IconType } from "react-icons";

interface Props {
  label: string;
  icon?: IconType;
  disabled?: boolean;
  small?: boolean;
  outline?: boolean;
  custom?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<Props> = ({
  label,
  icon: Icon,
  small,
  outline,
  disabled,
  custom,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
      flex items-center justify-center gap-2 w-full rounded-md
      border-[1.5px] border-slate-700 hover:opacity-80
      disabled:opacity-70 disabled:cursor-not-allowed
      ${outline ? "text-slate-700 bg-white" : "bg-slate-700 text-white"}
      ${
        small
          ? "px-1 py-2 text-sm font-light"
          : "px-3 py-4 text-md font-semibold"
      }
      ${custom}`}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
