"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { BsPlusCircleDotted } from "react-icons/bs";

const NewAddressPlaceholder = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/addresses/create");
      }}
      className="flex items-center justify-center h-16 border-[1.5px] border-slate-400 border-dashed rounded-md cursor-pointer"
    >
      <BsPlusCircleDotted size={32} />
    </div>
  );
};

export default NewAddressPlaceholder;
