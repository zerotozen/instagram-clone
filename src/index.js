import "./wdyr"
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, FieldValue } from "./lib/firebase";
import "./styles/app.css";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

//client side render app: react(create react app)
// data base Firebase
// react-loading-skeleton
// tailwind

//folder structure
//src
// -> components,
// ->constants,
// ->contexts,
// ->helpers,
// ->hooks,
// ->pages,
// ->lib(firebase),
// ->services(firebase funcitions)
