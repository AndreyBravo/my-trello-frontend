import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MAppBar } from "../AppBar";

const columns = [
  
  { field: "lastName", headerName: "Метрика", width: 400 },
  
  {
    field: "age",
    headerName: "вес",
    type: "number",
    
  },
//   {
//     field: "fullName",
//     headerName: "Общая оценка",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.age / 100}`,
//   },
];

const rows = [
  { id: 1, lastName: "Количество завершенных задач", firstName: "Jon", age: 0.2 },
  { id: 2, lastName: "Время, затраченное на выполнение задач", firstName: "Cersei", age: 0.3 },
  { id: 3, lastName: "Соблюдение сроков выполнения задач", firstName: "Jaime", age: 0.4 },
  { id: 4, lastName: "Качество выполненных задач (обратная связь).", firstName: "Arya", age: 0.45 },
  
];

export const KPI = () => {
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          
        />
      </div>
    </>
  );
};
