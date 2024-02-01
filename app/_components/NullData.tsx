"use client";

import Button from "./ui/Button";
import { IoArrowUndoSharp } from "react-icons/io5";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
}

const NullData: React.FC<Props> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full h-[50vh] text-slate-800 text-xl md:text-2xl">
      <p className="font-medium">{title}</p>
      <div>
        <Button
          label="Go back"
          icon={IoArrowUndoSharp}
          onClick={() => {
            router.back();
          }}
          small
        />
      </div>
    </div>
  );
};

export default NullData;
