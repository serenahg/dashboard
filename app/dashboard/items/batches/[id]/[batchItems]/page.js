"use client";
import MainTableCRUD from "@/components/UI/MainTableCRUD";
import { projectsBatches } from "@/utils/batchesMock";
import { removeKeys } from "@/utils/constants";
import React, { useEffect, useState } from "react";

const BatchItems = ({ params }) => {
  const batch = params.batchItems.replace("-", " ");
  const selectedProject = projectsBatches.find(
    (project) => project["project number"] === params.id
  );
  const selectedBatch = selectedProject.batches.find((batchObj) =>
    batchObj.hasOwnProperty(batch)
  );

  const cleanedBatch = removeKeys(selectedBatch[batch], [
    "dimensions",
    "compositions",
    "specifications",
  ]);
  const [localBatch, setLocalBatch] = useState(cleanedBatch);

  useEffect(() => {
    console.log(localBatch);
  }, [localBatch]);
  return (
    <div className="h-full w-full flex flex-col p-2 overflow-auto">
      <h1 className="font-bold text-2xl text-primary-button p-2 flex">
        Project {params.id}
        <p className="pl-2 font-normal"> {params.batchItems} Batch</p>
      </h1>
      <div className="bg-slate-100 p-2 rounded-md overflow-x-auto">
        <div className="inline-block min-w-max w-full">
          <MainTableCRUD
            tableItems={localBatch}
            projectNum={params.id}
            linkables={selectedBatch.linkables}
            setTableItems={setLocalBatch}
          />
        </div>
      </div>
    </div>
  );
};

export default BatchItems;
