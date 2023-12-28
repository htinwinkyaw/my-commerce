import React from "react";

interface Props {
  title: string;
  center?: boolean;
}

const Heading: React.FC<Props> = ({ title, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h2 className="font-bold text-2xl text-slate-700">{title}</h2>
    </div>
  );
};

export default Heading;
