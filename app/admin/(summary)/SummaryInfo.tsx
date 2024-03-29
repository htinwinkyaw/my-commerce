"use client";

import { Order, PaymentStatus, Product, User } from "@prisma/client";
import React, { useEffect, useState } from "react";

import Heading from "@/app/_components/ui/Heading";
import { formatNumber } from "@/app/_utils/formatNumber";
import { formatPrice } from "@/app/_utils/formatPrice";

interface Props {
  products: Product[];
  orders: Order[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const SummaryInfo: React.FC<Props> = ({ products, orders, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      const tempData = { ...prev };

      const totalSale = orders.reduce((acc, item) => {
        if (item.paymentStatus === PaymentStatus.completed) {
          return (acc += item.amount);
        }
        return acc;
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.paymentStatus === PaymentStatus.completed;
      });

      const unpaidOrders = orders.filter((order) => {
        return order.deliveryStatus === PaymentStatus.pending;
      });

      tempData.sale.digit = totalSale;
      tempData.products.digit = products.length;
      tempData.orders.digit = orders.length;
      tempData.unpaidOrders.digit = unpaidOrders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1150px] m-auto text-slate-700">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key, i) => {
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition"
              >
                <div className="text-xl md:text-4xl font-bold">
                  {summaryData[key].label === "Total Sale"
                    ? formatPrice(summaryData[key].digit)
                    : formatNumber(summaryData[key].digit)}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SummaryInfo;
