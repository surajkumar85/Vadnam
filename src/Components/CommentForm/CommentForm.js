import "./CommentForm.css";

import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Timestamp } from "firebase/firestore";
import { useFirestore } from "../../hooks/useFirestore";
import CommentList from "../CommentList/CommentList";

function CommentForm({ project }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updateData, document } = useFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      commentUser: user.displayName,
      imgUrl: user.photoURL,
      content: newComment,
      createdAt: Timestamp.now(),
      id: Math.random(),
    };
    await updateData(project.id, {
      comments: [commentData, ...project.comments],
    });
    if (!document) {
      setNewComment("");
    }
  };

  return (
    <div className="commentForm">
      <form className="commentForm__form" onSubmit={handleSubmit}>
        <div className="commentForm__formGroup">
          <label htmlFor="comment" className="login__label">
            Comment
          </label>
          <textarea
            name="comment"
            id="comment"
            required
            className="login__input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <button className="primary__btn">Add Comment</button>
      </form>
      <div className="commentForm__comments">
        <CommentList comments={project?.comments} />
      </div>
    </div>
  );
}

export default CommentForm;
