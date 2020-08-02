import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import storeInstance from "./store/RootStore";
import "mobx-react-lite/batchingForReactDom";

export const StoreContext = React.createContext(storeInstance);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContext.Provider value={storeInstance}>
        <App />
      </StoreContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
