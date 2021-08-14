//hook para obtener la informacion de firebase
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);
  console.log("ESTO QUE ES", user);
  useEffect(() => {
    async function getUserObjByUserId() {
      //we need function que podamos llamar que nos de el usuario badado en su id
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);
  console.log("Esto es usuario de user users", user);
  return { user: activeUser, setActiveUser };
}
