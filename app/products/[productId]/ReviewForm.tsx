"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";

import Button from "@/app/_components/ui/Button";
import { Rating } from "@mui/material";
import TextArea from "@/app/admin/add-product/TextArea";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
}

const ReviewForm: React.FC<Props> = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { rating: 0, comment: "" },
  });

  const handleRatingChange = (event: any) => {
    setValue("rating", event.target.defaultValue);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    try {
      const { comment, rating } = data;

      const response = await axios.post("/api/reviews", {
        productId,
        comment,
        rating,
      });

      if (response.data.status === 401) {
        toast.error(response.data.message);
      }

      if (response.data.status === 201) {
        toast.success(response.data.message);
        reset();
        router.refresh();
      }

      if (response.data.status === 500) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[500px] flex flex-col gap-2">
      <h3>Add Your Rating</h3>
      <div>
        <Rating defaultValue={0} onChange={handleRatingChange} />
      </div>
      <TextArea
        id="comment"
        label="Product Review"
        register={register}
        errors={errors}
        required={false}
        disabled={loading}
      />
      <Button
        label={loading ? "Adding..." : "Add Review"}
        onClick={handleSubmit(onSubmit)}
        disabled={loading}
      />
    </div>
  );
};

export default ReviewForm;
