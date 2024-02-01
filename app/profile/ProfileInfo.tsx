"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";

import Button from "../_components/ui/Button";
import { CurrentUserDetail } from "@/types/user";
import Input from "../_components/ui/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  user: CurrentUserDetail | null;
}

const ProfileInfo = ({ user }: Props) => {
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: user?.name || "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setUpdating(true);

    axios
      .put("/api/profile", { name: data.name })
      .then(() => {
        toast.success("Profile is updated.");
        setEditing(false);
        router.refresh();
      })
      .catch(() => {
        toast.error("Failed to update profile.");
      })
      .finally(() => {
        setUpdating(false);
        setImage(null);
      });
  };

  return (
    <div className="flex flex-col gap-3">
      {editing && (
        <>
          <Input
            label="New Name"
            id="name"
            type="text"
            control={control}
            errors={errors}
            register={register}
            disabled={updating}
            required
          />
          <div className="flex flex-row justify-between gap-1">
            <Button
              label="Cancel"
              onClick={() => {
                setImage(null);
                setEditing(false);
                reset();
              }}
              outline
              small
            />
            <Button
              label={updating ? "Updating..." : "Update"}
              onClick={handleSubmit(onSubmit)}
              small
            />
          </div>
        </>
      )}

      {!editing && (
        <>
          <div className="flex flex-row gap-2">
            <span>Name:</span>
            <span>{user!.name}</span>
          </div>
          <Button
            label="Edit Profile"
            onClick={() => {
              setEditing((prev) => !prev);
            }}
            small
            outline
          />
        </>
      )}
    </div>
  );
};
export default ProfileInfo;
