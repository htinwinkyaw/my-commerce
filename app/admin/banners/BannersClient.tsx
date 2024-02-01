"use client";

import { Banner } from "@prisma/client";
import BannerThumbnail from "./BannerThumbnail";
import { BsPlusCircleDotted } from "react-icons/bs";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  banners: Banner[];
}

const AddBannerClient: React.FC<Props> = ({ banners }) => {
  const router = useRouter();

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {banners.map((banner, i) => {
          return <BannerThumbnail key={i} banner={banner} />;
        })}

        <div
          className="w-full h-full flex items-center justify-center py-5 text-slate-400 
          border-2 border-slate-400 border-dotted rounded-md cursor-pointer"
          onClick={() => {
            router.push("/admin/banners/create");
          }}
        >
          <BsPlusCircleDotted size={50} />
        </div>
      </div>
    </div>
  );
};

export default AddBannerClient;
