import "./ProjectList.css";
import { Link } from "react-router-dom";

import React from "react";
import Avatar from "../Avatar/Avatar";

function ProjectList({ projects }) {
  return (
    <div className="projects">
      {projects?.length === 0 && (
        <p className="projects__subheading">No projects yet</p>
      )}
      {projects?.map((pro) => (
        <Link to={`projects/${pro.id}`} key={pro.id} className="project">
          <div className="project__createdBy">
            <p>
              created by: <strong>{pro.createdBy.displayName}</strong>
            </p>
            <div className="project__avatar">
              <Avatar src={pro.createdBy.imgUrl} />
            </div>
          </div>
          <h1 className="project__name">{pro.proName}</h1>
          <p className="project__discription">
            Discription: {pro.discription.substring(0, 30)}...
          </p>
          <div className="project__footer">
            <p className="project__date">
              {pro.dueDate.toDate().toDateString()}
            </p>
            <div className="project__assigned">
              <span className="project__subheading">Assigned to:</span>
              {pro.assignedList &&
                pro.assignedList.map((ava) => (
                  <span key={ava.imgUrl} className="project__avatar">
                    <Avatar src={ava.imgUrl} />
                  </span>
                ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProjectList;
