"use client";

import useCart from "@/app/_hooks/useCart";
import Link from "next/link";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";

const NavCart = () => {
  const { totalQuantity } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-1 cursor-pointer"
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>
      <span className="absolute flex items-center justify-center top-[-10px] right-[-10px] h-6 w-6 rounded-full text-sm bg-slate-700 text-slate-200">
        {totalQuantity}
      </span>
    </Link>
  );
};

export default NavCart;
