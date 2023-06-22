import Link from "next/link";
import React from "react";

const MainTable = ({ tableItems, linkable, linkableKey }) => {
  const extractKeys = (arr) => {
    const allKeys = new Set();
    arr.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        allKeys.add(key);
      });
    });
    return Array.from(allKeys);
  };

  const keys = extractKeys(tableItems);

  return (
    <div className="h-full w-full  overflow-y-auto">
      <table className="min-w-full text-left text-sm font-light table-auto">
        <thead className="bg-primary-menu text-white sticky top-0">
          <tr>
            {keys.map((key) => (
              <th
                scope="col"
                className="px-2 py-1 font-medium tracking-wide "
                key={key}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-h-full overflow-y-auto overflow-scroll ">
          {tableItems.map((item, index) => (
            <tr
              className="border-b dark:border-neutral-500 cursor-pointer"
              key={index}
            >
              {keys.map((key) => (
                <td className="px-2 py-1 font-normal" key={key}>
                  {item[key] === item.image ? (
                    <img
                      src={item.image}
                      style={{ width: "80px" }}
                      alt="Item"
                    />
                  ) : linkable && key === linkableKey ? (
                    <a
                      target="_blank"
                      className="underline text-primary-button"
                      href={`${linkable}/${item[key]
                        .replace(/\s+/g, "-")
                        .replace(/-+/g, "-")}`}
                      rel="noopener noreferrer"
                    >
                      {item[key]}
                    </a>
                  ) : (
                    item[key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
