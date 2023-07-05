"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  Fragment,
  useRef,
  useReducer,
} from "react";
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
} from "react-icons/md";

import UpperMenuAnimated from "./UpperMenuAnimated";
import { TabOptionsMenu } from "./TabOptionsMenu";
import { IconWithDescription } from "./IconWithDescription";

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value, index) => (
          <option value={value} key={index} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={columnFilterValue || ""}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded outline-none text-primary-menu"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

const MainTableCrud = ({ tableItems, projectNum }) => {
  //const [localData, setLocalData] = useState(tableItems);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const up = (
    <MdKeyboardArrowDown className="text-white cursor-pointer z-40" size={18} />
  );
  const down = (
    <MdKeyboardArrowUp className="text-white cursor-pointer z-40" size={18} />
  );

  /** @type import("@tanstack/react-table").ColumnDef<any>*/

  const columns = [
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
      header: "IMAGE",
      accessorKey: "image",
      id: "image",
      cell: (info) => (
        info.getValue(),
        (
          <img
            src={info.row.original.image}
            style={{ width: "30px" }}
            alt="Item"
          />
        )
      ),
    },
    {
      id: "location",
      header: "LOCATION",
      accessorKey: "location",
      cell: (info) => info.getValue(),
    },
    {
      id: "price",
      header: "PRICE",
      accessorKey: "price",
      cell: (info) => info.getValue(),
    },
    {
      id: "size",
      header: "SIZE",
      accessorKey: "size",
      cell: (info) => info.getValue(),
    },
    {
      id: "ordered",
      header: "ORDERED",
      accessorKey: "ordered",
      cell: (info) => info.getValue(),
    },
    {
      id: "description",
      header: "DESCRIPTION",
      accessorKey: "description",
      cell: (info) => info.getValue(),
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
      cell: (info) => info.getValue(),
    },
    {
      id: "budget cur",
      header: "BUDGET CUR",
      accessorKey: "budget cur",
      cell: (info) => info.getValue(),
    },
    {
      id: "act rate",
      header: "ACT RATE",
      accessorKey: "act rate",
      cell: (info) => info.getValue(),
    },
    {
      id: "batch",
      header: "BATCH",
      accessorKey: "batch",
      cell: (info) => info.getValue(),
    },
    {
      id: "part n",
      header: "PART N",
      accessorKey: "part n",
      cell: (info) => info.getValue(),
    },
    {
      id: "supplier",
      header: "SUPPLIER",
      accessorKey: "supplier",
      cell: (info) => info.getValue(),
    },
    {
      id: "manifacturer",
      header: "MANIFACTURER",
      accessorKey: "manifacturer",
      cell: (info) => info.getValue(),
    },
    {
      id: "uom",
      header: "UOM",
      accessorKey: "uom",
      cell: (info) => info.getValue(),
    },
    {
      id: "coo",
      header: "COO",
      accessorKey: "coo",
      cell: (info) => info.getValue(),
    },
    {
      id: "del address",
      header: "DEL ADDRESS",
      accessorKey: "del address",
      cell: (info) => info.getValue(),
    },
    {
      id: "supplier address",
      header: "SUPPLIER ADDRESS",
      accessorKey: "supplier address",
      cell: (info) => info.getValue(),
    },
    {
      id: "fabric res",
      header: "FABRIC RES",
      accessorKey: "fabric res",
      cell: (info) => info.getValue(),
    },
    {
      id: "fabric date",
      header: "FABRIC DATE",
      accessorKey: "fabric date",
      cell: (info) => info.getValue(),
    },
    {
      id: "sample inspection",
      header: "SAMPLE INSPECTION",
      accessorKey: "sample inspection",
      cell: (info) => info.getValue(),
    },
    {
      id: "shop drowing",
      header: "SHOP DROWING",
      accessorKey: "shop drowing",
      cell: (info) => info.getValue(),
    },
  ];
  const [data, setData] = useState(useMemo(() => tableItems, []));

  const ctable = useReactTable({
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
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
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

  useEffect(() => {
    const columnFilters = ctable.getState().columnFilters;
    // Iterate over each column filter
    columnFilters.forEach((filter) => {
      const { id } = filter;
      // Check if the column is being filtered
      if (id) {
        const sorting = ctable.getState().sorting;
        // Check if the column is not already sorted
        if (!sorting.some((sort) => sort.id === id)) {
          // Set the sorting for the filtered column
          ctable.setSorting([{ id, desc: false }]);
        }
      }
    });
  }, [ctable.getState().columnFilters]);

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

  return (
    <div>
      <div className="flex items-start">
        {/* <input
          spellCheck="true"
          placeholder="Search all..."
          className="outline-none my-2 px-2 rounded-md"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
        

        
        */}
        <div className="flex">
          <UpperMenuAnimated>
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
          </UpperMenuAnimated>
        </div>
        {/*<TabOptionsMenu>
        {{
          showHide: [
            ctable.getAllLeafColumns().map((column) => {
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
            }),
          ],
          delete: [],
        }}
      </TabOptionsMenu>*/}
        <div className="absolute ml-6 flex">
          <IconWithDescription
            icon={MdDelete}
            description="Delete"
            onclick={handleDelete}
          />
        </div>
      </div>

      <table className=" w-full text-left text-sm font-light">
        <thead className="bg-primary-menu text-white sticky top-0">
          {ctable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  colSpan={header.colSpan}
                  key={header.id}
                  className="font-medium whitespace-no-wrap px-4 py-1 pt-2 cursor-pointer"
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
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter column={header.column} table={ctable} />
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
          {ctable.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className=" font-normal border-b dark:border-neutral-500 even:bg-gray-50"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTableCrud;

/*
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
