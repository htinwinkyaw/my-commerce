import React from "react";

interface Props {
  onClick: () => void;
}

const Backdrop: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed z-20 w-screen h-screen top-0 left-0 opacity-50 bg-slate-400"
    />
  );
};

export default Backdrop;
