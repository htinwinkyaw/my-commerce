"use client";

import { Address } from "@prisma/client";
import { AddressItemMode } from "@/types/enum";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  mode: AddressItemMode;
  address: Address;
}

const AddressItem: React.FC<Props> = ({ mode, address }) => {
  const router = useRouter();

  const handleSetDefault = (id: string) => {
    axios
      .patch(`/api/addresses/${id}`)
      .then((res) => {
        toast.success("Changed delivery address.");
        router.push("/checkout");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Cannot change delivery address.");
      });
  };

  return (
    <div className="flex flex-col gap-1 p-2 text-sm border-[1.5px] border-slate-400 rounded-md">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4 ">
          <span className="font-semibold">{address.receiverName}</span>
          <span className="text-slate-400">{address.phone}</span>
        </div>
        {mode === AddressItemMode.Edit && (
          <div className="flex flex-col justify-between items-end">
            <div
              className="text-blue-400 cursor-pointer"
              onClick={() => {
                router.push(`/addresses/edit/${address.id}`);
              }}
            >
              Edit
            </div>
          </div>
        )}

        {mode === AddressItemMode.View && (
          <div
            className="text-blue-400 cursor-pointer"
            onClick={() => router.push("/addresses/change")}
          >
            Change
          </div>
        )}

        {mode === AddressItemMode.Change && !address.isSelectedAddress && (
          <div
            className="text-blue-700 cursor-pointer"
            onClick={handleSetDefault.bind(null, address.id)}
          >
            SET AS DEFAULT
          </div>
        )}
      </div>
      <div>
        {address.line}, {address.township}, {address.state}. (
        {address.postalCode})
      </div>
      {address.deliveryNote && (
        <div className="italic">Noted: {address.deliveryNote}</div>
      )}
      {address.isSelectedAddress && (
        <div className="mt-2 px-2 py-1 text-xs uppercase border-[1px] border-slate-400 rounded w-fit">
          DEFAULT
        </div>
      )}
    </div>
  );
};

export default AddressItem;
