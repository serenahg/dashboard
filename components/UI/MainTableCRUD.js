"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import MainButton from "./MainButton";

const MainTableCrud = ({ tableItems, projectNum }) => {
  const up = (
    <MdKeyboardArrowDown className="text-white cursor-pointer z-40" size={18} />
  );
  const down = (
    <MdKeyboardArrowUp className="text-white cursor-pointer z-40" size={18} />
  );
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  /** @type import("@tanstack/react-table").ColumnDef<any>*/

  const columns = [
    {
      header: "IMAGE",
      accessorKey: "image",
      cell: (info) => (
        <img
          src={info.row.original.image}
          style={{ width: "80px" }}
          alt="Item"
        />
      ),
    },
    {
      header: "LOCATION",
      accessorKey: "location",
    },
    {
      header: "PRICE",
      accessorKey: "price",
    },
    {
      header: "SIZE",
      accessorKey: "size",
    },
    {
      header: "ORDERED",
      accessorKey: "ordered",
    },
    {
      header: "DESCRIPTION",
      accessorKey: "description",
    },
    {
      header: "ITEM REF",
      accessorKey: "item ref",
      cell: (info) => {
        console.log(info);
        return (
          <a
            target="_blank"
            className="underline text-primary-button"
            href={`/dashboard/items/batches/${projectNum}/Living-Room/${info.row.original["item ref"]}`}
          >
            {info.row.original["item ref"]}
          </a>
        );
      },
    },
    {
      header: "QTY",
      accessorKey: "qty",
    },
    {
      header: "BUDGET CUR",
      accessorKey: "budget cur",
    },
    {
      header: "ACT RATE",
      accessorKey: "act rate",
    },
    {
      header: "BATCH",
      accessorKey: "batch",
    },
    {
      header: "PART N",
      accessorKey: "part n",
    },
    {
      header: "SUPPLIER",
      accessorKey: "supplier",
    },
    {
      header: "MANIFACTURER",
      accessorKey: "manifacturer",
    },
    {
      header: "UOM",
      accessorKey: "uom",
    },
    {
      header: "COO",
      accessorKey: "coo",
    },
    {
      header: "DEL ADDRESS",
      accessorKey: "del address",
    },
    {
      header: "SUPPLIER ADDRESS",
      accessorKey: "supplier address",
    },
    {
      header: "FABRIC RES",
      accessorKey: "fabric res",
    },
    {
      header: "FABRIC DATE",
      accessorKey: "fabric date",
    },
    {
      header: "SAMPLE INSPECTION",
      accessorKey: "sample inspection",
    },
    {
      header: "SHOP DROWING",
      accessorKey: "shop drowing",
    },
  ];
  const data = useMemo(() => tableItems, []);

  const ctable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  let columnBeingDragged;

  const onDragStart = (e) => {
    columnBeingDragged = Number(e.currentTarget.dataset.columnIndex);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const newPosition = Number(e.currentTarget.dataset.columnIndex);
    const currentCols = ctable.getVisibleLeafColumns().map((c) => c.id);
    const colToBeMoved = currentCols.splice(columnBeingDragged, 1);

    currentCols.splice(newPosition, 0, colToBeMoved[0]);
    ctable.setColumnOrder(currentCols); // <------------------------here you save the column ordering state
  };

  return (
    <div>
      <input
        placeholder="Search all..."
        className="outline-none my-2 px-2 rounded-md"
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table className=" w-full text-left text-sm font-light">
        <thead className="bg-primary-menu text-white sticky top-0">
          {ctable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  colSpan={header.colSpan}
                  key={header.id}
                  className="font-medium whitespace-no-wrap px-4 py-1 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                  draggable={
                    !ctable.getState().columnSizingInfo.isResizingColumn
                  }
                  data-column-index={header.index}
                  onDragStart={onDragStart}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={onDrop}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center ">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        {
                          asc: up,
                          desc: down,
                        }[header.column.getIsSorted() ?? null]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {ctable.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className=" font-normal border-b dark:border-neutral-500 even:bg-gray-50"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex w-1/3 items-center justify-between  py-3">
        <MainButton title="First Page" fun={() => ctable.setPageIndex(0)} />
        <MainButton
          disabled={!ctable.getCanPreviousPage()}
          title="Previous Page"
          fun={() => ctable.previousPage()}
        />

        <MainButton
          disabled={!ctable.getCanNextPage()}
          title="Next Page"
          fun={() => ctable.nextPage()}
        />

        <MainButton
          title="Last Page"
          fun={() => ctable.setPageIndex(ctable.getPageCount() - 1)}
        />
      </div>
    </div>
  );
};

export default MainTableCrud;
