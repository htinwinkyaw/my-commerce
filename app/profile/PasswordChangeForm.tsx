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
  user: CurrentUserDetail;
  onChange: (state: boolean) => void;
}

const PasswordChangeForm = ({ user, onChange }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    const { confirmPassword, newPassword1, newPassword2 } = data;

    if (newPassword1 !== newPassword2) {
      return toast.error("New passwords are not matching.");
    }

    try {
      const response = await axios.patch("/api/profile", {
        confirmPassword,
        newPassword1,
        newPassword2,
      });

      console.log(response);
      toast.success("Password is updated.");
      onChange(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {user.hashedPassword && (
        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          control={control}
          errors={errors}
          register={register}
          disabled={loading}
          required
        />
      )}
      <Input
        label="New Password"
        id="newPassword1"
        type="password"
        control={control}
        errors={errors}
        register={register}
        disabled={loading}
        required
      />
      <Input
        label="Re-enter New Password"
        id="newPassword2"
        type="password"
        control={control}
        errors={errors}
        register={register}
        disabled={loading}
        required
      />
      <div className="flex flex-row justify-between gap-2">
        <Button
          label="Cancel"
          onClick={() => {
            onChange(false);
          }}
          disabled={loading}
          outline
          small
        />
        <Button
          label={loading ? "Updating..." : "Update"}
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          small
        />
      </div>
    </div>
  );
};

export default PasswordChangeForm;
