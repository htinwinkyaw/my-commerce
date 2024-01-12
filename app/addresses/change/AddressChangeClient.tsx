"use client";

import { Address } from "@prisma/client";
import AddressItem from "@/app/profile/AddressItem";
import { AddressItemMode } from "@/types/enum";
import NewAddressPlaceholder from "@/app/_components/NewAddressPlaceholder";
import NullData from "../../_components/NullData";
import React from "react";

interface Props {
  addresses: Address[] | undefined;
}

const AddressChangeClient: React.FC<Props> = ({ addresses }) => {
  if (!addresses || addresses.length === 0) {
    return (
      <NullData title="No Address yet. Go to profile and create new address first." />
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        <div className="font-semibold uppercase">Addresses</div>

        {addresses.map((address, i) => {
          return (
            <AddressItem
              key={i}
              mode={AddressItemMode.Change}
              address={address}
            />
          );
        })}

        <NewAddressPlaceholder />
      </div>
    </div>
  );
};

export default AddressChangeClient;
