"use client";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import React, { useState } from "react";

import { Banner as BannerType } from "@prisma/client";
import Image from "next/image";

interface Props {
  banners: BannerType[];
}

const Banner: React.FC<Props> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  enum Direction {
    left,
    right,
  }

  const handleSlide = (direction: Direction) => {
    let newIndex;
    const lastIndex = banners.length - 1;

    if (direction === Direction.left) {
      if (currentIndex === 0) {
        newIndex = lastIndex;
      } else {
        newIndex = currentIndex - 1;
      }
    } else {
      if (currentIndex === lastIndex) {
        newIndex = 0;
      } else {
        newIndex = currentIndex + 1;
      }
    }
    setCurrentIndex(newIndex);
  };

  return (
    <div className="w-[100%] h-[100%]">
      <div className="relative w-[100%] h-[100%]">
        <Image
          src={banners[currentIndex].image}
          alt={`banner${currentIndex}`}
          fill
        />
        {banners.length > 1 && (
          <>
            <div
              onClick={handleSlide.bind(null, Direction.left)}
              className="absolute top-[50%] left-[40px] cursor-pointer"
            >
              <MdArrowBackIos />
            </div>
            <div
              onClick={handleSlide.bind(null, Direction.right)}
              className="absolute top-[50%] right-[40px] cursor-pointer"
            >
              <MdArrowForwardIos />
            </div>
          </>
        )}
      </div>
    </div>
  );
  // return (
  //   <div className="w-full flex items-center justify-center bg-rose-400 mx-auto">
  //     <Image
  //       src={banners[0].image}
  //       alt="banner"
  //       width={1300}
  //       height={100}
  //       className="bg-teal-600"
  //     />
  //   </div>
  // );
};

export default Banner;
