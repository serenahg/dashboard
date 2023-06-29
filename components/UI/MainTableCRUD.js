import React, { useState, useRef, useEffect } from "react";

const MainTableCRUD = ({ tableItems, linkables, setTableItems }) => {
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
  const inputRefs = useRef([]);

  const getLinkableUrl = (key, value) => {
    const linkable = linkables.find((linkable) => linkable[key]);
    if (linkable) {
      return `${linkable[key]}/${value
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")}`;
    }
    return null;
  };

  const [editableItem, setEditableItem] = useState(null);

  const handleEditClick = (itemIndex, key) => {
    setEditableItem({ itemIndex, key });
  };

  const handleInputChange = (event, itemIndex, key) => {
    const { value } = event.target;

    setTableItems((prevTableItems) => {
      const updatedItems = [...prevTableItems];
      updatedItems[itemIndex] = { ...updatedItems[itemIndex] };
      updatedItems[itemIndex][key] = value;

      return updatedItems;
    });
  };

  const handleKeyDown = (event, itemIndex, key) => {
    if (event.key === "Tab" && editableItem) {
      event.preventDefault();

      const nextKeyIndex = keys.indexOf(key) + 1;
      const nextKey = nextKeyIndex < keys.length ? keys[nextKeyIndex] : keys[0];

      setEditableItem({ itemIndex, key: nextKey });
    }
  };

  useEffect(() => {
    if (editableItem) {
      const { itemIndex, key } = editableItem;
      const inputRef = inputRefs.current[itemIndex]?.[key];

      if (inputRef) {
        inputRef.focus();
      }
    }
  }, [editableItem]);

  return (
    <table className="table-auto w-full text-left text-sm font-light">
      <thead className="bg-primary-menu text-white sticky top-0 w-full ">
        <tr className="">
          {keys.map((key) => (
            <th
              scope="col"
              className="font-medium whitespace-no-wrap px-2 "
              key={key}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableItems.map((item, itemIndex) => (
          <tr
            className="border-b dark:border-neutral-500 text-xs w-full "
            key={itemIndex}
          >
            {keys.map((key) => (
              <td
                className="px-2 font-normal overflow-hidden whitespace-no-wrap relative w-32"
                key={key}
              >
                {item[key] === item.image ? (
                  <img src={item.image} className="w-20" alt="Item" />
                ) : editableItem &&
                  editableItem.itemIndex === itemIndex &&
                  editableItem.key === key ? (
                  <input
                    type="text"
                    className="h-full text-xs bg-white outline-none font-normal rounded-md w-28 "
                    value={item[key]}
                    onChange={(event) =>
                      handleInputChange(event, itemIndex, key)
                    }
                    onKeyDown={(event) => handleKeyDown(event, itemIndex, key)}
                    ref={(ref) => {
                      if (!inputRefs.current[itemIndex]) {
                        inputRefs.current[itemIndex] = {};
                      }
                      inputRefs.current[itemIndex][key] = ref;
                    }}
                    onBlur={() => setEditableItem(null)}
                  />
                ) : (
                  <>
                    {linkables && getLinkableUrl(key, item[key]) ? (
                      <a
                        target="_blank"
                        className="underline text-primary-button cursor-pointer whitespace-no-wrap"
                        href={getLinkableUrl(key, item[key])}
                        rel="noopener noreferrer"
                      >
                        {item[key]}
                      </a>
                    ) : (
                      <span onClick={() => handleEditClick(itemIndex, key)}>
                        {item[key]}
                      </span>
                    )}
                  </>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MainTableCRUD;
