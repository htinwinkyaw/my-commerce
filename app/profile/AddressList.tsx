import { Address } from "@prisma/client";
import React from "react";
import AddressItem from "./AddressItem";
import { AddressItemMode } from "@/types/enum";
import NewAddressPlaceholder from "../_components/NewAddressPlaceholder";

interface Props {
  addresses: Address[];
}

const AddressList: React.FC<Props> = ({ addresses }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="font-semibold uppercase">Addresses</div>
      {addresses.map((address, i) => {
        return (
          <AddressItem key={i} mode={AddressItemMode.Edit} address={address} />
        );
      })}

      <NewAddressPlaceholder />
    </div>
  );
};

export default AddressList;
