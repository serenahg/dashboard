import MainTable from "@/components/UI/MainTable";
import { projectsBatches } from "@/utils/batchesMock";
import React from "react";

const Item = ({ params }) => {
  const batch = params.item.replace("-", " ");
  console.log("batch", batch);
  const selectedProject = projectsBatches.find(
    (project) => project["project number"] === params.id
  );
  const selectedBatch = selectedProject.batches.find((batchObj) =>
    batchObj.hasOwnProperty(batch)
  );
  console.log("selected batch", selectedBatch);

  return (
    <div>
      {params.id} each item {params.item}
      <MainTable tableItems={selectedBatch[batch]} />
    </div>
  );
};

export default Item;
//  <MainTable tableItems={selectedBatch} />
