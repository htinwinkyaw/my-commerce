"use client";

import { DeliveryStatus, Order, PaymentStatus, User } from "@prisma/client";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdMoney,
} from "react-icons/md";
import React, { useCallback, useState } from "react";

import ActionButton from "@/app/_components/ui/ActionButton";
import CustomDataGrid from "@/app/_components/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import Status from "@/app/_components/ui/Status";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type ExtendedOrder = Order & {
  user: User;
};

interface Props {
  orders: ExtendedOrder[];
}

const ManageOrdersClient: React.FC<Props> = ({ orders }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdateDeliveryStatus = useCallback(
    async (id: string, newStatus: DeliveryStatus) => {
      setLoading(true);

      try {
        await axios.patch("/api/orders", {
          id: id,
          deliveryStatus: newStatus,
        });

        toast.success("Delivery status changed.");
        router.refresh();
      } catch (error) {
        toast.error("Failed to change delivery status.");
      } finally {
        setLoading(true);
      }
    },
    [router]
  );

  const handleUpdatePaymentStatus = useCallback(
    async (id: string, newStatus: PaymentStatus) => {
      setLoading(true);

      try {
        await axios.patch("/api/orders", { id, paymentStatus: newStatus });

        toast.success("Payment status is changed.");
        router.refresh();
      } catch (error) {
        toast.error("Failed to change payment status.");
      }
    },
    [router]
  );

  const rows = orders?.map((order) => {
    return {
      id: order.id,
      customer: order.user.name,
      amount: order.amount,
      paymentStatus: order.paymentStatus,
      deliveryStatus: order.deliveryStatus,
      date: moment(order.createdAt).fromNow(),
    };
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 250 },
    { field: "customer", headerName: "Customer", width: 220 },
    { field: "amount", headerName: "Amount", width: 130 },
    {
      field: "paymentStatus",
      headerName: "Payment",
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
                bgColor="bg-slate-200"
                textColor="text-slate-700"
              />
            ) : params.row.deliveryStatus === DeliveryStatus.dispatched ? (
              <Status
                label="dispatched"
                icon={MdDeliveryDining}
                bgColor="bg-purple-200"
                textColor="bg-purple-700"
              />
            ) : params.row.deliveryStatus === DeliveryStatus.completed ? (
              <Status
                label="delivered"
                icon={MdDone}
                bgColor="bg-green-200"
                textColor="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex flex-row items-center justify-between gap-1">
            <ActionButton
              label="Switch Payment Status "
              icon={MdMoney}
              onClick={handleUpdatePaymentStatus.bind(
                null,
                params.row.id,
                PaymentStatus.completed
              )}
              disabled={loading}
            />
            <ActionButton
              label="Dispatch"
              icon={MdDeliveryDining}
              onClick={handleUpdateDeliveryStatus.bind(
                null,
                params.row.id,
                DeliveryStatus.dispatched
              )}
              disabled={loading}
            />
            <ActionButton
              label="Delivered"
              icon={MdDone}
              onClick={handleUpdateDeliveryStatus.bind(
                null,
                params.row.id,
                DeliveryStatus.completed
              )}
              disabled={loading}
            />
          </div>
        );
      },
    },
  ];

  return (
    <CustomDataGrid title="Mannage Orders" rows={rows} columns={columns} />
  );
};

export default ManageOrdersClient;
