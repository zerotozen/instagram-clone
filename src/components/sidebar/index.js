import React, { useContext } from "react";
import useUser from "../../hooks/user-users";
import User from "./user";
import Suggestions from "./suggestions";
import UserContext from "../../context/user";

export default function Sidebar() {
  const {
    user: { docId, fullName, username, userId, following },
  } = useUser();

  console.log("user AQUI", useUser());
  // const {
  //   user: { docId, fullName, username, userId, following },
  // } = useContext(UserContext);

  const { user } = useContext(UserContext);
  console.log("HELLOOO", user);

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions
        currentUserId={userId}
        following={following}
        currentUserDocId={docId}
      />
    </div>
  );
}

Sidebar.whyDidYouRender = true;
