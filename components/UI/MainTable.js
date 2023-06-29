import React from "react";

const MainTable = ({ tableItems, linkables }) => {
  console.log("linkables", linkables);
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

  const getLinkableUrl = (key, value) => {
    const linkable = linkables.find((linkable) => linkable[key]);
    if (linkable) {
      return `${linkable[key]}/${value
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")}`;
    }
    return null;
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      <table className="min-w-full text-left text-sm font-light table-auto w-full">
        <thead className="bg-primary-menu text-white sticky top-0 w-full">
          <tr>
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
        <tbody className="max-h-full overflow-y-auto overflow-scroll w-full">
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

export default MainTable;
