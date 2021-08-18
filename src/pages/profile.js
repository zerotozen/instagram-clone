import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header";
import UserProfile from "../components/profile/";
import LoggedInUserContext from "../context/logged-user";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);

      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, history]);

  return (
    <LoggedInUserContext.Provider value={{ user }}>
      {user?.username ? (
        <div className="bg-gray-background h-full">
          <Header />
          <div className="mx-auto max-w-screen.lg">
            <UserProfile user={user} />
          </div>
        </div>
      ) : null}
    </LoggedInUserContext.Provider>
  );
}
