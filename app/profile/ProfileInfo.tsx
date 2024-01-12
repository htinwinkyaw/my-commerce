"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";

import Button from "../_components/Button";
import { CurrentUserDetail } from "@/types/user";
import Input from "../_components/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  user: CurrentUserDetail | null;
}

const ProfileInfo = ({ user }: Props) => {
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: user?.email || "", name: user?.name || "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setUpdating(true);

    const { name, email } = data;

    axios
      .put("/api/profile", { name, email })
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
      });
  };

  return (
    <div className="flex flex-col gap-3">
      {editing ? (
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
      ) : (
        <div>
          <span>Name:</span>
          <span>{user!.name}</span>
        </div>
      )}

      {!editing && (
        <Button
          label="Edit Profile"
          onClick={() => {
            setEditing((prev) => !prev);
          }}
          small
          outline
        />
      )}

      {editing && (
        <div className="flex flex-row justify-between gap-1">
          <Button
            label="Cancel"
            onClick={() => {
              setEditing(false);
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
      )}
    </div>
  );
};

export default ProfileInfo;
