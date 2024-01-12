"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DeliveryStatus, Order, PaymentStatus, User } from "@prisma/client";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";

import Heading from "../_components/Heading";
import NullData from "../_components/NullData";
import React from "react";
import Status from "../_components/Status";
import { formatPrice } from "../_utils/formatPrice";

interface Props {
  orders: Array<Order & { user: User }>;
}

const OrdersClient: React.FC<Props> = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <NullData title={"There is no order."} />;
  }

  const rows = orders.map((order) => {
    return {
      id: order.id,
      name: order.user.name,
      amount: order.amount,
      paymentStatus: order.paymentStatus,
      deliveryStatus: order.deliveryStatus,
    };
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 250 },
    { field: "name", headerName: "Customer Name", width: 220 },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="font-semibold">{formatPrice(params.row.amount)}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === PaymentStatus.pending ? (
              <Status
                label="pending"
                icon={MdAccessTimeFilled}
                textColor="text-slate-700"
                bgColor="bg-slate-200"
              />
            ) : params.row.paymentStatus === PaymentStatus.completed ? (
              <Status
                label="completed"
                icon={MdDone}
                textColor="text-teal-700"
                bgColor="bg-teal-200"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === DeliveryStatus.pending ? (
              <Status
                label="pending"
                icon={MdAccessTimeFilled}
                textColor="text-slate-700"
                bgColor="bg-slate-200"
              />
            ) : params.row.deliveryStatus === DeliveryStatus.dispatched ? (
              <Status
                label="pending"
                icon={MdDeliveryDining}
                textColor="text-purple-700"
                bgColor="bg-purple-200"
              />
            ) : params.row.deliveryStatus === DeliveryStatus.completed ? (
              <Status
                label="pending"
                icon={MdDone}
                textColor="text-teal-700"
                bgColor="bg-teal-200"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col max-w-[1100px] m-auto text-xl">
      <div className="mt-8 mb-4">
        <Heading title="Your Orders" center />
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default OrdersClient;
