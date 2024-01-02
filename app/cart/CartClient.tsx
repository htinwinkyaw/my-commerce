"use client";

import React from "react";

import Heading from "../_components/Heading";
import useCart from "../_hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import CartItem from "./CartItem";
import Button from "../_components/Button";
import { formatPrice } from "../_utils/formatPrice";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

interface Props {
  user: User | null;
}

const CartClient: React.FC<Props> = ({ user }) => {
  const { cartProducts, totalAmount, handleClearCart } = useCart();

  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty.</div>
        <div>
          <Link
            href="/"
            className="flex flex-row items-center gap-2 mt-12 text-slate-500"
          >
            <MdArrowBack size={24} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Shopping Cart" center />

      <div className="grid grid-cols-5 items-center gap-4 mt-8 pb-2 text-xs uppercase">
        <div className="col-span-2 justify-self-start">Product</div>
        <div className="justify-self-center">Price</div>
        <div className="justify-self-center">Quantity</div>
        <div className="justify-self-end">Total</div>
      </div>

      {cartProducts.map((product, i) => {
        return <CartItem key={i} product={product} />;
      })}

      <div className="flex flex-row justify-between gap-4 p-4 border-t-[1.5px] border-slate-200">
        <div className="w-[90px]">
          <Button label="Clear Cart" onClick={handleClearCart} small outline />
        </div>
        <div className="flex flex-col gap-1 items-start text-sm">
          <div className="flex flex-row justify-between gap-5 w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>

          <Button
            label="Checkout"
            onClick={() => {
              user ? router.push("/checkout") : router.push("/signin");
            }}
          />

          <div className="mt-4 text-slate-500">
            <Link href="/" className="flex gap-2 items-center">
              <MdArrowBack />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
