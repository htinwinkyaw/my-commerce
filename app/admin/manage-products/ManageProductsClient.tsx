"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  MdAccessTimeFilled,
  MdCached,
  MdDelete,
  MdDone,
  MdEdit,
  MdRemoveRedEye,
} from "react-icons/md";
import React, { useCallback } from "react";

import ActionButton from "@/app/_components/ActionButton";
import CustomDataGrid from "@/app/_components/CustomDataGrid";
import { ExtendedProductType } from "@/types/product";
import NullData from "@/app/_components/NullData";
import Status from "@/app/_components/Status";
import axios from "axios";
import { formatPrice } from "@/app/_utils/formatPrice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  products: ExtendedProductType[] | null | undefined;
}

const ManageProductsClient: React.FC<Props> = ({ products }) => {
  const router = useRouter();

  const handleStock = useCallback(
    (id: string, inStock: boolean) => {
      axios
        .patch("/api/products", { id, inStock })
        .then((res) => {
          router.refresh();
          toast.success("Update Product: Success");
        })
        .catch((error) => {
          toast.error("Update Product: Fail");
        });
    },
    [router]
  );

  const handleDelete = useCallback(
    (id: string) => {
      axios
        .delete(`/api/products/${id}`)
        .then((response) => {
          if (response.data.status === 204) {
            toast.success(response.data.message);
          }
          router.refresh();
        })
        .catch((error) => {
          error;
          toast.error("Delete Product: Fail");
        });
    },
    [router]
  );

  if (!products) return <NullData title="Oops! No product is found." />;

  const rows = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: formatPrice(product.price),
      brand: product.brand,
      category: product.category.name,
      inStock: product.inStock,
      images: product.images,
    };
  });

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="text-slate-800 font-bold">{params.row.price}</div>
        );
      },
    },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "category", headerName: "Category", width: 200 },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 150,
      renderCell: (params) => {
        return params.row.inStock ? (
          <Status
            icon={MdDone}
            label="In Stock"
            textColor="text-teal-800"
            bgColor="bg-teal-300"
          />
        ) : (
          <Status
            icon={MdAccessTimeFilled}
            label="Out of Stock"
            textColor="text-rose-800"
            bgColor="bg-rose-300"
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-between gap-2">
            <ActionButton
              label="Update Stock Status"
              icon={MdCached}
              onClick={handleStock.bind(
                null,
                params.row.id,
                params.row.inStock
              )}
              disabled={false}
            />
            <ActionButton
              label="Delete"
              icon={MdDelete}
              onClick={handleDelete.bind(null, params.row.id)}
              disabled={false}
            />
            <ActionButton
              label="Edit"
              icon={MdEdit}
              onClick={() => {
                router.push(`/products/edit/${params.row.id}`);
              }}
              disabled={false}
            />
            <ActionButton
              label="View"
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/products/${params.row.id}`);
              }}
              disabled={false}
            />
          </div>
        );
      },
    },
  ];

  return (
    <CustomDataGrid title="Manage Products" rows={rows} columns={columns} />
  );
};

export default ManageProductsClient;
