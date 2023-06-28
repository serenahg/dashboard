"use client";
import { projectsBatches } from "@/utils/batchesMock";
import { useState } from "react";

const Item = ({ params }) => {
  const selectedProject = projectsBatches.find(
    (project) => project["project number"] === params.id
  );
  console.log("params", params);
  const [selectedItem, setSelectedItem] = useState("");

  // Loop through each category in the selected project
  for (const category of Object.keys(selectedProject)) {
    // Check if the category contains the desired item reference
    if (selectedProject[category]) {
      // Loop through each item in the category
      for (const item of selectedProject[category]) {
        console.log(item);
        // Check if the item reference matches the desired value
        if (item["item ref"] === params.item) {
          setSelectedItem(item);
          break; // Exit the loop if the item is found
        }
      }
    }

    if (selectedItem) {
      break; // Exit the loop if the item is found
    }
  }

  // Use the `selectedItem` variable to access the desired item's information
  if (selectedItem) {
    // Access the properties of the selected item
    const location = selectedItem.location;
    const price = selectedItem.price;
    const size = selectedItem.size;
    console.log(location);
  }
  console.log("selected item", selectedItem);
  return (
    <div className="h-full w-full flex flex-col p-2 overflow-auto ">
      <h1 className="font-bold text-2xl text-primary-button p-2 flex">
        Project {params.id}
        <p className="pl-2 font-normal flex">
          {params.batchItems} Batch -{" "}
          <span className="font-normal text-primary-button flex pl-2">
            Item {params.item}
          </span>
        </p>
      </h1>
      <div className=" rounded-md flex-col h-full">
        <div className="flex items-center justify-between w-full h-1/3 bg-slate-100 rounded-md p-2 mb-4">
          <div>description</div>
          <div>picture</div>
        </div>

        <div className="flex items-center  h-2/3">
          <div className="bg-slate-100 h-ful w-1/3 p-2 text-center rounded-md mr-2">
            Dimensions
          </div>
          <div className="bg-slate-100 h-ful w-1/3 p-2 text-center rounded-md mr-2">
            Composition
          </div>
          <div className="bg-slate-100 h-ful w-1/3 p-2 text-center rounded-md">
            Specifications
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
