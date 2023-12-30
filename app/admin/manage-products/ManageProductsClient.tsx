"use client";

import ActionButton from "@/app/_components/ActionButton";
import Heading from "@/app/_components/Heading";
import Status from "@/app/_components/Status";
import { formatPrice } from "@/app/_utils/formatPrice";
import { ExtendedProductType } from "@/types/products";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import {
  MdAccessTimeFilled,
  MdCached,
  MdDelete,
  MdDone,
  MdEdit,
  MdRemoveRedEye,
} from "react-icons/md";

interface Props {
  products: ExtendedProductType[];
}

const ManageProductsClient: React.FC<Props> = ({ products }) => {
  const router = useRouter();

  const handleStock = useCallback(
    (id: string, inStock: boolean) => {
      axios
        .put("/api/products", { id, inStock })
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
        .then((res) => {
          router.refresh();
          toast.success("Delete Product: Success");
        })
        .catch((error) => {
          toast.error("Delete Product: Fail");
        });
    },
    [router]
  );

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
              onClick={() => {}}
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
    <div className="flex flex-col m-auto max-w-[1150px] text-xl">
      <div className="mt-8 mb-4">
        <Heading title="Manage Products" center />
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default ManageProductsClient;
