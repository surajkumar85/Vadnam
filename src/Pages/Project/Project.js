import React from "react";
import "./Project.css";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import Avatar from "../../Components/Avatar/Avatar";
import CommentForm from "../../Components/CommentForm/CommentForm";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

function Project() {
  const param = useParams();
  const { document, error } = useDocument("projects", param.id);
  const { deleteData } = useFirestore();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // console.log(document);
  const handleClick = async (e) => {
    e.preventDefault();
    await deleteData(document.id);
    navigate("/");
  };

  return (
    <div className="projectDetail">
      <h1 className="dashboard__heading">Project Detail</h1>
      {error && <h1 className="error">{error}</h1>}
      {document && !error && (
        <div className="projectDetail__detail">
          <h1 className="project__heading">{document.proName}</h1>
          <p className="projectDetail__subheading">created by:</p>
          <div className="projectDetail__createdBy">
            <div className="projectDetail__createdBy--first">
              <span className="project__avatar">
                <Avatar src={document.createdBy.imgUrl} />
              </span>
              <p className="projectDetail__createdBy">
                {document.createdBy.displayName}
              </p>
            </div>
            <p className="project__date">
              {document.createdAt.toDate().toDateString()}
            </p>
          </div>
          <p className="projectDetail__discription">
            <p className="projectDetail__subheading">Project Discription</p>
            <p className="projectDetail__discription--detail">
              {document.discription}
            </p>
          </p>
          <p className="projectDetail__subheading">
            Project Category:{" "}
            <strong className="projectDetail__category">
              {document.category}
            </strong>
          </p>
          <p className="projectDetail__subheading">Project Assigned:</p>
          <div className="projectDetail__assigned">
            {document.assignedList &&
              document.assignedList.map((doc) => (
                <span key={doc.imgUrl} className="project__avatar">
                  <Avatar src={doc.imgUrl} />
                </span>
              ))}
          </div>
          <p className="projectDetail__dueDate">
            Due date: <span>{document.dueDate.toDate().toDateString()}</span>
          </p>
          {user.uid === document.createdBy.id && (
            <button className="primary__btn" onClick={handleClick}>
              Mark as Complete
            </button>
          )}
        </div>
      )}
      <div className="projectDetail__comments">
        {document && !error && <CommentForm project={document} />}
      </div>
    </div>
  );
}

export default Project;
