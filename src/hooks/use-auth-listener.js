//custom hook that listen if there is a user
import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

//hook para guardar el usuario en el almacenamiento local
export default function useAuthListener() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      //if we have an user we can store user in localstorage
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        //we dont have an authUser, clear the localstorage
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });
    return () => listener();
  }, [firebase]);
  console.log("ESto es user the auth listener", user);
  return { user };
}
