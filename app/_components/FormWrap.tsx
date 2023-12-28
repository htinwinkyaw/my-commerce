import React from "react";

const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-full min-h-fit pt-12 pb-24">
      <div className="flex flex-col items-center gap-6 w-full max-w-[650px] p-4 md:p-8 rounded-md shadow-xl shadow-slate-200">
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
