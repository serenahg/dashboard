import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const removeKeys = (data, keysToExclude) => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      const extractedKeys = {};
      for (const key in item) {
        if (!keysToExclude.includes(key)) {
          extractedKeys[key] = item[key];
        }
      }
      return extractedKeys;
    });
  } else if (typeof data === "object") {
    const extractedKeys = {};
    for (const key in data) {
      if (!keysToExclude.includes(key)) {
        extractedKeys[key] = data[key];
      }
    }
    return extractedKeys;
  } else {
    // Handle unsupported data types if needed
    return data;
  }
};

// MainTableCrud functions:

export const IndeterminateCheckbox = ({
  indeterminate,
  className = "",
  ...rest
}) => {
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
};

export const Filter = ({ column, table }) => {
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
};

// A debounced input react component
export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
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
};

let columnBeingDragged;

export const onDragStart = (e) => {
  columnBeingDragged = Number(e.currentTarget.dataset.columnIndex);
};

export const onDrop = (e, table) => {
  e.preventDefault();
  const newPosition = Number(e.currentTarget.dataset.columnIndex);
  const currentCols = table.getVisibleLeafColumns().map((c) => c.id);
  const colToBeMoved = currentCols.splice(columnBeingDragged, 1);
  currentCols.splice(newPosition, 0, colToBeMoved[0]);
  table.setColumnOrder(currentCols); // <------------------------here you save the column ordering state
};

export const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const useSkipper = () => {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip];
};

export const customCellRenderer = ({
  getValue,
  row: { index, original },
  column: { id },
  table,
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (id === "image") {
    return <img src={value} style={{ width: "30px" }} alt="Item" />;
  }
  return (
    <input
      placeholder={`insert ${initialValue === "" && table.getColumn(id).id}`}
      className={`${
        index % 2 == 0 ? "bg-slate-100" : "bg-slate-50"
      } outline-primary-menu px-2 `}
      value={value || ""}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export const newRow = {
  select: false,
  image: "",
  location: "",
  price: "",
  size: "",
  ordered: "",
  description: "",
  "item ref": "",
  qty: "",
  "budget cur": "",
  "act rate": "",
  batch: "",
  "part n": "",
  supplier: "",
  manifacturer: "",
  uom: "",
  coo: "",
  "del address": "",
  "supplier address": "",
  "fabric res": "",
  "fabric date": "",
  "sample inspection": "",
  "shop drowing": "",
};
