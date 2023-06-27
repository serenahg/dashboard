"use client";
import { MainListBox } from "@/components/UI/MainListBox";
import { projectsBatches } from "@/utils/batchesMock";
import { removeKeys } from "@/utils/constants";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Batches = () => {
  const [selectedProject, setSelectedProject] = useState(projectsBatches[0]);
  const cleanedBatches = removeKeys(projectsBatches, ["batches"]);
  console.log("selected", selectedProject);
  const router = useRouter();

  const handleProjectSelection = (project) => {
    setSelectedProject(project);
    router.push(`batches/${project["project number"]}`);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start">
      <div className="text-center flex flex-col justify-center items-center bg-slate-100 rounded-md w-1/3 h-40 mt-40">
        <h2 className="text-center">Choose a project</h2>
        <MainListBox
          list={cleanedBatches}
          displayKey="project"
          setSelectedProject={handleProjectSelection}
          selected={selectedProject}
        />
      </div>
    </div>
  );
};

export default Batches;
