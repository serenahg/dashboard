"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdDelete,
  MdAdd,
} from "react-icons/md";

import UpperMenuAnimated from "./UpperMenuAnimated";
import { IconWithDescription } from "./IconWithDescription";
import {
  Filter,
  IndeterminateCheckbox,
  customCellRenderer,
  fuzzyFilter,
  newRow,
  onDragStart,
  onDrop,
  useSkipper,
} from "@/utils/constants";

const MainTableCrud = ({ tableItems, projectNum }) => {
  /** @type import("@tanstack/react-table").ColumnDef<any>*/
  const columns = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
    {
      id: "image",
      header: "IMAGE",
      accessorKey: "image",
      cell: (info) => {
        const value = info.getValue();
        return (
          <div>
            <img src={value} style={{ width: "30px" }} alt="Item" />
          </div>
        );
      },
    },
    ,
    {
      id: "location",
      header: "LOCATION",
      accessorKey: "location",
      cell: customCellRenderer,
    },
    {
      id: "price",
      header: "PRICE",
      accessorKey: "price",
      cell: customCellRenderer,
    },
    {
      id: "size",
      header: "SIZE",
      accessorKey: "size",
      cell: customCellRenderer,
    },
    {
      id: "ordered",
      header: "ORDERED",
      accessorKey: "ordered",
      cell: customCellRenderer,
    },
    {
      id: "description",
      header: "DESCRIPTION",
      accessorKey: "description",
      cell: customCellRenderer,
    },
    {
      id: "item ref",
      header: "ITEM REF",
      accessorKey: "item ref",
      cell: (info) => {
        info.getValue();
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
      id: "qty",
      header: "QTY",
      accessorKey: "qty",
      cell: customCellRenderer,
    },
    {
      id: "budget cur",
      header: "BUDGET CUR",
      accessorKey: "budget cur",
      cell: customCellRenderer,
    },
    {
      id: "act rate",
      header: "ACT RATE",
      accessorKey: "act rate",
      cell: customCellRenderer,
    },
    {
      id: "batch",
      header: "BATCH",
      accessorKey: "batch",
      cell: customCellRenderer,
    },
    {
      id: "part n",
      header: "PART N",
      accessorKey: "part n",
      cell: customCellRenderer,
    },
    {
      id: "supplier",
      header: "SUPPLIER",
      accessorKey: "supplier",
      cell: customCellRenderer,
    },
    {
      id: "manifacturer",
      header: "MANIFACTURER",
      accessorKey: "manifacturer",
      cell: customCellRenderer,
    },
    {
      id: "uom",
      header: "UOM",
      accessorKey: "uom",
      cell: customCellRenderer,
    },
    {
      id: "coo",
      header: "COO",
      accessorKey: "coo",
      cell: customCellRenderer,
    },
    {
      id: "del address",
      header: "DEL ADDRESS",
      accessorKey: "del address",
      cell: customCellRenderer,
    },
    {
      id: "supplier address",
      header: "SUPPLIER ADDRESS",
      accessorKey: "supplier address",
      cell: customCellRenderer,
    },
    {
      id: "fabric res",
      header: "FABRIC RES",
      accessorKey: "fabric res",
      cell: customCellRenderer,
    },
    {
      id: "fabric date",
      header: "FABRIC DATE",
      accessorKey: "fabric date",
      cell: customCellRenderer,
    },
    {
      id: "sample inspection",
      header: "SAMPLE INSPECTION",
      accessorKey: "sample inspection",
      cell: customCellRenderer,
    },
    {
      id: "shop drowing",
      header: "SHOP DROWING",
      accessorKey: "shop drowing",
      cell: customCellRenderer,
    },
  ]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [data, setData] = useState(useMemo(() => tableItems, []));

  const up = (
    <MdKeyboardArrowDown className="text-white cursor-pointer z-40" size={18} />
  );
  const down = (
    <MdKeyboardArrowUp className="text-white cursor-pointer z-40" size={18} />
  );

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      columnFilters,
      sorting,
      globalFilter: filtering,
      columnVisibility,
      rowSelection,
    },
    autoResetPageIndex,
    enableRowSelection: true, //enable row selection for all rows
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,

    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    // debugTable: true,
  });

  useEffect(() => {
    const columnFilters = table.getState().columnFilters;
    // Iterate over each column filter
    columnFilters.forEach((filter) => {
      const { id } = filter;
      // Check if the column is being filtered
      if (id) {
        const sorting = table.getState().sorting;
        // Check if the column is not already sorted
        if (!sorting.some((sort) => sort.id === id)) {
          // Set the sorting for the filtered column
          table.setSorting([{ id, desc: false }]);
        }
      }
    });
  }, [table.getState().columnFilters]);

  const handleAdd = () => {
    setData((prevData) => [newRow, ...prevData]);
  };
  const handleDelete = async () => {
    if (rowSelection) {
      const filteredData = data.filter((item, index) => !rowSelection[index]);
      const updatedRowSelection = { ...rowSelection };
      Object.keys(updatedRowSelection).forEach((index) => {
        if (updatedRowSelection[index]) {
          delete updatedRowSelection[index];
        }
      });
      setData(filteredData);
      setRowSelection(updatedRowSelection);
    }
  };
  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div>
      <div className="flex items-start">
        <div className="flex">
          <UpperMenuAnimated>
            {table.getAllLeafColumns().map((column) => {
              return (
                <div key={column.id} className="px-1">
                  <label>
                    <input
                      {...{
                        type: "checkbox",
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                      }}
                    />{" "}
                    {column.id}
                  </label>
                </div>
              );
            })}
          </UpperMenuAnimated>
        </div>

        <div className="absolute ml-8 flex">
          <IconWithDescription
            icon={MdDelete}
            description="Delete"
            onclick={handleDelete}
          />
          <IconWithDescription
            icon={MdAdd}
            description="Add"
            onclick={handleAdd}
          />
        </div>
      </div>

      <table className=" w-full text-left text-sm font-light">
        <thead className="bg-primary-menu text-white sticky top-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  colSpan={header.colSpan}
                  key={header.id}
                  className="font-medium whitespace-no-wrap px-4 py-1 pt-2 cursor-pointer"
                  draggable={
                    !table.getState().columnSizingInfo.isResizingColumn
                  }
                  data-column-index={header.index}
                  onDragStart={onDragStart}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => onDrop(e, table)}
                >
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter column={header.column} table={table} />
                    </div>
                  ) : null}

                  {header.isPlaceholder ? null : (
                    <div
                      className="flex items-center "
                      onClick={header.column.getToggleSortingHandler()}
                    >
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
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className=" font-normal border-b dark:border-neutral-500 even:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => {
                  const cellContext = cell.getContext();
                  const cellMeta = cellContext.column.columnDef.meta;
                  const cellContextProps =
                    cellMeta &&
                    cellMeta.getCellContext &&
                    cellMeta.getCellContext(cellContext);
                  return (
                    <td
                      key={cell.id}
                      className="px-4 py-2"
                      {...cellContextProps}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MainTableCrud;

/*
  <input
          spellCheck="true"
          placeholder="Search all..."
          className="outline-none my-2 px-2 rounded-md"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
        

        
        
      <div className="flex w-1/3 items-center justify-between  py-3">
        <MainButton title="First Page" fun={() => table.setPageIndex(0)} />
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




                <div>
            <BiHide size={28} className="text-primary-menu cursor-pointer " />
          </div>
          <div className="flex">
            {ctable.getAllLeafColumns().map((column) => {
              return (
                <div key={column.id} className="px-1">
                  <label>
                    <input
                      {...{
                        type: "checkbox",
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                      }}
                    />{" "}
                    {column.id}
                  </label>
                </div>
              );
            })}
          </div>

*/
