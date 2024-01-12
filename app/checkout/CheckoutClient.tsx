"use client";

import AddressItem from "../profile/AddressItem";
import { AddressItemMode } from "@/types/enum";
import Button from "../_components/Button";
import CartItem from "../cart/CartItem";
import { CurrentUserDetail } from "@/types/user";
import Heading from "../_components/Heading";
import NewAddressPlaceholder from "../_components/NewAddressPlaceholder";
import React from "react";
import axios from "axios";
import { formatPrice } from "../_utils/formatPrice";
import toast from "react-hot-toast";
import useCart from "../_hooks/useCart";
import { useRouter } from "next/navigation";

interface Props {
  user: CurrentUserDetail | null;
}

const CheckoutClient: React.FC<Props> = ({ user }) => {
  const { cartProducts, totalAmount, handleClearCart } = useCart();
  const router = useRouter();

  const handleOrder = () => {
    if (!defaultAddress) return toast.error("Please add address to deliver.");

    axios
      .post("/api/orders", {
        cartProducts,
        totalAmount,
        addressId: defaultAddress?.id,
      })
      .then((res) => {
        handleClearCart();
        toast.success("Order created.");
        router.push("/orders");
      })
      .catch((error) => {
        toast.error("Order failed.");
        console.log(error);
      });
  };

  const defaultAddress = user?.address.find((address) => {
    return address.isSelectedAddress === true;
  });

  return (
    <div>
      <Heading title="Order Summary" center />

      <div>
        <h2 className="uppercase text-slate-600">Delivery Address</h2>
        <div>
          {defaultAddress ? (
            <AddressItem mode={AddressItemMode.View} address={defaultAddress} />
          ) : (
            <NewAddressPlaceholder />
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 items-center gap-4 mt-8 pb-2 text-xs uppercase">
        <div className="col-span-2 justify-self-start">Product</div>
        <div className="justify-self-center">Price</div>
        <div className="justify-self-center">Quantity</div>
        <div className="justify-self-end">Total</div>
      </div>

      {cartProducts?.map((product, i) => {
        return <CartItem key={i} product={product} checkout />;
      })}

      <div className="flex flex-col items-end justify-end gap-4 border-t-[1.5px] border-slate-200 pt-4">
        <div className="flex flex-row justify-between gap-5 text-base font-semibold">
          <span>Subtotal</span>
          <span>{formatPrice(totalAmount)}</span>
        </div>
        <p className="text-sm text-slate-500">
          * Shipping fee will be paid by customer when deliver process.
        </p>
        <div className="w-[200px]">
          <Button label="Confirm" onClick={handleOrder} small />
        </div>
      </div>
    </div>
  );
};

export default CheckoutClient;
