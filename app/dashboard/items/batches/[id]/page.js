import MainTable from "@/components/UI/MainTable";
import { projectsBatches } from "@/utils/batchesMock";
import React from "react";

const BatchItem = ({ params }) => {
  const selectedProject = projectsBatches.find(
    (project) => project["project number"] === params.id
  );

  return (
    <div className="h-full w-full flex flex-col p-2">
      <h1 className="font-bold text-2xl text-primary-button p-2 flex">
        Project {params.id} <p className="pl-2 font-normal"> Batches</p>
      </h1>
      <div className="bg-slate-100 p-2 rounded-md">
        <MainTable
          tableItems={selectedProject["batch info"]}
          linkables={selectedProject.linkables}
        />
      </div>
    </div>
  );
};

export default BatchItem;
