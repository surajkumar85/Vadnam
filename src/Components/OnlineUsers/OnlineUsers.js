import React from "react";
import "./OnlineUsers.css";
import { useCollection } from "../../hooks/useCollection";
import Avatar from "../Avatar/Avatar";

function OnlineUsers() {
  const { documents } = useCollection("users");
  console.log(documents);
  return (
    <div className="onlineusers">
      <h1 className="onlineusers__heading">All users</h1>
      <ul className="onlineusers__users">
        {documents &&
          documents.map((doc) => (
            <li key={doc.imgUrl} className="onlineusers__user">
              <span className={doc.online ? "online" : ""}></span>
              <span className="onlineusers__img">
                <Avatar src={doc.imgUrl} />
              </span>
              <h2>{doc.displayName}</h2>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default OnlineUsers;
