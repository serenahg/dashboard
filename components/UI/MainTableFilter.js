import React, { useState } from "react";

const MainTableFilter = ({ tableItems, linkables }) => {
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
  const [filters, setFilters] = useState({});

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const getLinkableUrl = (key, value) => {
    const linkable = linkables.find((linkable) => linkable[key]);
    if (linkable) {
      return `${linkable[key]}/${value
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")}`;
    }
    return null;
  };

  const filteredData = tableItems.filter((item) => {
    for (const key in filters) {
      const filterValue = filters[key].toLowerCase();
      const itemValue = String(item[key]).toLowerCase();

      if (!itemValue.includes(filterValue)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="h-full w-full overflow-y-auto">
      <table className="min-w-full text-left text-sm font-light table-auto">
        <thead className=" text-white sticky top-0">
          <tr className="">
            {keys.map((key) => (
              <th key={key} className=" py-1">
                <input
                  type="text"
                  className="w-full !outline-none px-2 py-1 font-light text-sm bg-white text-primary-menu border border-gray-300 rounded-md"
                  placeholder={`Filter ${key}...`}
                  value={filters[key] || ""}
                  onChange={(e) => handleFilterChange(key, e.target.value)}
                />
              </th>
            ))}
          </tr>
          <tr className="bg-primary-menu">
            {keys.map((key) => (
              <th
                scope="col"
                className="px-2 py-1 font-medium tracking-wide"
                key={key}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-h-full overflow-y-auto overflow-scroll">
          {filteredData.map((item, index) => (
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
                  ) : (
                    <React.Fragment>
                      {linkables && getLinkableUrl(key, item[key]) ? (
                        <a
                          target="_blank"
                          className="underline text-primary-button"
                          href={getLinkableUrl(key, item[key])}
                          rel="noopener noreferrer"
                        >
                          {item[key]}
                        </a>
                      ) : (
                        item[key]
                      )}
                    </React.Fragment>
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

export default MainTableFilter;
