import React from "react";

const MainTable = ({ tableItems }) => {
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
    <div className="max-h-full ">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="bg-primary-menu text-white">
            <tr>
              {keys.map((key) => (
                <th scope="col" className="px-6 py-1" key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableItems.map((item, index) => (
              <tr
                className="border-b dark:border-neutral-500 cursor-pointer"
                key={index}
              >
                {keys.map((key) => (
                  <td className="px-6 py-1 font-normal" key={key}>
                    {item[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTable;
