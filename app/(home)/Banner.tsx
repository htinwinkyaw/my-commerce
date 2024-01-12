import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="w-full flex items-center justify-center bg-rose-400 mx-auto">
      <Image
        src={"/banner.jpeg"}
        alt="banner"
        width={1300}
        height={100}
        className="bg-teal-600"
      />
    </div>
  );
};

export default Banner;
