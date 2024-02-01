import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1920px] mx-auto px-2 md:px-5 xl:px-10">
      {children}
    </div>
  );
};

export default Container;
