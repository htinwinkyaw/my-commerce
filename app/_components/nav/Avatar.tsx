import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  src?: string | null;
}
const Avatar: React.FC<Props> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        width={30}
        height={30}
        className="rounded-full"
      />
    );
  }

  return <FaUserCircle size={24} />;
};

export default Avatar;
