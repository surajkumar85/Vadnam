import "./CommentList.css";

import React from "react";
import Avatar from "../Avatar/Avatar";

function CommentList({ comments }) {
  return (
    <div className="commentList">
      {comments?.length === 0 && (
        <h1 className="projects__subheading">No comments yet.</h1>
      )}
      {comments?.length !== 0 &&
        comments?.map((comment) => (
          <>
            <div key={comment.id} className="commentList__commentUser">
              <div className="projectDetail__createdBy">
                <div className="projectDetail__createdBy--first">
                  <span className="project__avatar">
                    <Avatar src={comment.imgUrl} />
                  </span>
                  <p className="projectDetail__createdBy">
                    {comment.commentUser}
                  </p>
                </div>
                <p className="project__date">
                  {comment.createdAt.toDate().toDateString()}
                </p>
              </div>
              <p className="commentList__body">{comment.content}</p>
            </div>
          </>
        ))}
    </div>
  );
}

export default CommentList;
