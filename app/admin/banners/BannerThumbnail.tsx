"use client";

import React, { useState } from "react";

import { Banner } from "@prisma/client";
import Button from "@/app/_components/ui/Button";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  banner: Banner;
}

const BannerThumbnail: React.FC<Props> = ({ banner }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDeleteBanner = (bannerId: string) => {
    setLoading(true);

    axios
      .delete(`/api/banners/${bannerId}`)
      .then((response) => {
        if (response.data.status === 204) {
          toast.success(response.data.message);
        }

        if (response.data.status === 500) {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        router.refresh();
        setLoading(false);
      });
  };

  const handleEditBanner = () => {
    router.push(`/admin/banners/edit/${banner.id}`);
  };

  const handleActiveBanner = (bannerId: string) => {
    setLoading(true);

    axios
      .patch(`/api/banners/${bannerId}`, { active: banner.active })
      .then((response) => {
        if (response.data.status === 200) {
          toast.success(response.data.message);
        }

        if (response.data.status === 500) {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        router.refresh();
        setLoading(false);
      });
  };

  return (
    <div className="border-[1.5px] border-slate-400 rounded-md">
      <div className="w-full p-4">
        <Image src={banner.image} alt={banner.id} width={420} height={300} />
      </div>
      <div className="flex items-center justify-between gap-1 px-2 pb-2">
        <Button
          label={banner.active ? "Set Inactive" : "Set Active"}
          onClick={handleActiveBanner.bind(null, banner.id)}
          disabled={loading}
          small
          outline
        />
        <Button
          label="Edit"
          onClick={handleEditBanner}
          disabled={loading}
          small
          outline
        />
        <Button
          label="Delete"
          onClick={handleDeleteBanner.bind(null, banner.id)}
          disabled={loading}
          small
          outline
        />
      </div>
    </div>
  );
};

export default BannerThumbnail;
