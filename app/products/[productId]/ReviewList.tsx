"use client";

import Heading from "@/app/_components/ui/Heading";
import { Rating } from "@mui/material";
import React from "react";
import moment from "moment";

interface Props {
  // reviews: Review[];
  reviews: any[];
}

const ReviewList: React.FC<Props> = ({ reviews }) => {
  return (
    <div className="mt-5">
      <Heading title="Product Reviews" />

      <div className="text-sm mt-2">
        {reviews.map((review, i: number) => {
          return (
            <div key={i} className="max-w-[500px]">
              <div className="flex gap-2 items-center">
                <div>{/* <Avatar src={review.user.image} /> */}</div>
                <div className="font-semibold">{review.user.name}</div>
                <div className="font-light">
                  {moment(review.createdAt).fromNow()}
                </div>
              </div>
              <div className="mt-2">
                <Rating value={review.rating} readOnly />
                <div className="ml-2">{review.comment}</div>
                <hr className="mt-4 mb-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewList;
