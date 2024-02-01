import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Heading from "./ui/Heading";
import React from "react";

interface Props {
  title: string;
  rows: any[];
  columns: GridColDef[];
}

const CustomDataGrid: React.FC<Props> = ({ title, rows, columns }) => {
  return (
    <div className="flex flex-col m-auto max-w-[1150px] text-xl">
      <div className="mt-8 mb-4">
        <Heading title={title} center />
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default CustomDataGrid;
