"use client";

import BarGraph, { GraphData } from "./BarGraph";
import { Order, Product, User } from "@prisma/client";

import React from "react";
import SummaryInfo from "./SummaryInfo";

interface Props {
  data: GraphData[];
  products: Product[];
  orders: Order[];
  users: User[];
}

const SummaryClient: React.FC<Props> = ({ products, orders, users, data }) => {
  return (
    <>
      <SummaryInfo products={products} orders={orders} users={users} />
      <div className="mt-4 mx-auto max-w-[1150px]">
        <BarGraph data={data} />
      </div>
    </>
  );
};

export default SummaryClient;
