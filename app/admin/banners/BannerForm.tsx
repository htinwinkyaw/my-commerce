"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";

import { Banner } from "@prisma/client";
import Button from "@/app/_components/ui/Button";
import FormWrap from "@/app/_components/ui/FormWrap";
import Heading from "@/app/_components/ui/Heading";
import Input from "@/app/_components/ui/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadImage } from "@/app/_utils/uploadImage";
import { useRouter } from "next/navigation";

interface Props {
  banner?: Banner;
}

const BannerForm: React.FC<Props> = ({ banner }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      link: banner ? banner.link : "",
      image: banner ? banner.image : "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    const downloadURL = await uploadImage(data, "/banners");

    try {
      const response = banner
        ? await axios.put(`/api/banners/${banner.id}`, {
            link: data.link,
            image: downloadURL,
          })
        : await axios.post("/api/banners", {
            link: data.link,
            image: downloadURL,
          });

      if (response.data.status === 200 || response.data.status === 201) {
        toast.success(response.data.message);
        router.push("/admin/banners");
        router.refresh();
      }

      if (response.data.status === 500) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div>
      <FormWrap>
        <Heading title="Banner Form" />
        <Input
          id="link"
          label="Banner Forwarding Link"
          control={control}
          errors={errors}
          register={register}
          disabled={loading}
          required
        />
        <input
          type="file"
          id="image"
          accept="image/*"
          disabled={loading}
          {...register("image", { required: true })}
          className="w-full cursor-pointer border-[1.5px] p-[-1.5px] border-slate-400 rounded
          file:p-4 file:bg-slate-700 file:text-slate-200  file:rounded-l
          disabled:cursor-not-allowed"
        />
        <div className="w-full flex flex-row items-center gap-1">
          <Button
            label="Cancel"
            onClick={() => {
              router.back();
            }}
            outline
          />
          <Button
            label={
              loading
                ? banner
                  ? "Updating..."
                  : "Adding..."
                : banner
                ? "Update Banner"
                : "Add New Banner"
            }
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          />
        </div>
      </FormWrap>
    </div>
  );
};

export default BannerForm;
