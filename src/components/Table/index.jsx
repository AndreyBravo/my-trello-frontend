import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from "@tanstack/react-table";

import mData from "../../data/stats.json";

import "./table.css";

export const MTable = () => {
  const data = React.useMemo(() => mData);

  const [sorted, setSerted] = React.useState([]);

  const [filter, setFilter] = React.useState('');

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      foter: "Name",
    },
    {
      header: "KPI",
      accessorKey: "kpi",
      foter: "KPI",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorted,
      globalFilter: filter
    },
    onSortingChange: setSerted,
    onGlobalFilterChange: setFilter,
  });

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input id="search" className="search" type="text" placeholder="filter..." value={filter} onChange={e => setFilter(e.target.value)} />
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    { asc: " min", desc: " max" }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn-group">
        <button onClick={() => table.setPageIndex(0)}>first</button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          prev
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          next
        </button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          last
        </button>
      </div>
    </div>
  );
};
