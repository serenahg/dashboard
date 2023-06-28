"use client";
import MainTable from "@/components/UI/MainTable";
import MainTableCRUD from "@/components/UI/MainTableCRUD";
import { projectsBatches } from "@/utils/batchesMock";
import React, { useState } from "react";

const BatchItems = ({ params }) => {
  const batch = params.batchItems.replace("-", " ");
  const selectedProject = projectsBatches.find(
    (project) => project["project number"] === params.id
  );
  const selectedBatch = selectedProject.batches.find((batchObj) =>
    batchObj.hasOwnProperty(batch)
  );
  const [localBatch, setLocalBatch] = useState(selectedBatch[batch]);

  return (
    <div className="h-full w-full flex flex-col p-2 overflow-auto">
      <h1 className="font-bold text-2xl text-primary-button p-2 flex">
        Project {params.id}
        <p className="pl-2 font-normal"> {params.batchItems} Batch</p>
      </h1>
      <div className="bg-slate-100 p-2 rounded-md overflow-x-auto">
        <div className="inline-block min-w-max">
          <MainTable
            tableItems={localBatch}
            linkables={selectedBatch.linkables}
          />
        </div>
      </div>
    </div>
  );
};

export default BatchItems;
