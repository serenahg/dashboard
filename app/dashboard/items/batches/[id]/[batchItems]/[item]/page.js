"use client";
import { projectsBatches } from "@/utils/batchesMock";
import { removeKeys } from "@/utils/constants";
import Image from "next/image";

const Item = ({ params }) => {
  const batch = params.batchItems.replace("-", " ");
  const item = params.item;
  const selectedProject = projectsBatches.find(
    (project) => project["project number"] === params.id
  );
  const selectedBatch = selectedProject.batches.find((batchObj) =>
    batchObj.hasOwnProperty(batch)
  );
  const selectedItem = selectedBatch[batch].find(
    (itemObj) => itemObj["item ref"] === item
  );

  const topInfo = removeKeys(selectedItem, [
    "dimensions",
    "compositions",
    "specifications",
    "image",
  ]);

  console.log("selected item", selectedItem.dimensions);
  return (
    <div className="h-screen w-full flex flex-col p-2 ">
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
        <div className="flex items-center justify-between w-full h-1/3 bg-slate-100 rounded-md p-2 mb-4 ">
          <div className="grid grid-cols-3 gap-2  w-2/3">
            {topInfo &&
              Object.entries(topInfo).map(([key, value]) => (
                <div key={key} className="flex px-4">
                  <p className="font-thin">{key}:</p>
                  <p className="font-medium pl-2">{value}</p>
                </div>
              ))}
          </div>
          <div className="bg-yellow-200 w-1/3 h-full ">
            <div className=" relative h-full">
              <Image
                src={selectedItem.image}
                alt="Picture of the item"
                fill
                priority={true}
                style={{
                  objectFit: "cover",
                  borderRadius: "0.375rem",
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center   h-2/3 p-2">
          <div className="bg-slate-100 h-full w-1/3 p-2 text-center rounded-md mr-2">
            <h3 className="bg-primary-menu text-white py-1 rounded-md">
              Dimensions
            </h3>
            <div className="pt-4">
              {selectedItem.dimensions &&
                Object.entries(selectedItem.dimensions).map(([key, value]) => (
                  <div key={key} className="flex px-4">
                    <p className="font-thin">{key}:</p>
                    <p className="font-medium pl-2">{value}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="bg-slate-100 h-full w-1/3 p-2 text-center rounded-md mr-2">
            <h3 className="bg-primary-menu text-white py-1 rounded-md">
              Compositions
            </h3>
            <div className="pt-4">
              {selectedItem.compositions &&
                Object.entries(selectedItem.compositions).map(
                  ([key, value]) => (
                    <div key={key} className="flex px-4">
                      <p className="font-thin">{key}:</p>
                      <p className="font-medium pl-2">{value}</p>
                    </div>
                  )
                )}
            </div>
          </div>
          <div className="bg-slate-100 h-full w-1/3 p-2 text-center rounded-md">
            <h3 className="bg-primary-menu text-white py-1 rounded-md">
              Specifications
            </h3>
            <div className="pt-4">
              {selectedItem.specifications &&
                Object.entries(selectedItem.specifications).map(
                  ([key, value]) => (
                    <div key={key} className="flex px-4">
                      <p className="font-thin">{key}:</p>
                      <p className="font-medium pl-2">{value}</p>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
