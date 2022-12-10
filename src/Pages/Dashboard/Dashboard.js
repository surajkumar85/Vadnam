import React, { useState } from "react";
import "./Dashboard.css";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../Components/ProjectList/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";

function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const { documents, error } = useCollection("projects", null, [
    "createdAt",
    "desc",
  ]);
  const { user } = useAuthContext();

  const handleClick = (filter) => {
    console.log(filter);
    setCurrentFilter(filter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedList.forEach((assignUser) => {
              if (user.uid === assignUser.id) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "sales":
          case "design":
          case "development":
          case "marketing":
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="dashboard">
      <h1 className="dashboard__heading">Dashboard</h1>
      {error && <h2 className="error">{error}</h2>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          handleClick={handleClick}
        />
      )}
      {documents && <ProjectList projects={projects} />}
    </div>
  );
}

export default Dashboard;
