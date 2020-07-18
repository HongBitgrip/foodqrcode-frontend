import React from "react";
import "./App.scss";
import "./components/Sidebar";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import LoginPage from "./components/content/LoginPage";
import { Link, Route, Router, Switch } from "react-router-dom";
import UserAdd from "./components/content/UserAdd";

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel" id="main-panel">
        <NavBar />
        <Header />
        <h3>
          <Link to="/users/add">Sign Up</Link>
        </h3>
        <h3>
          <Link to="/login">Login</Link>
        </h3>
        <Switch>
          <Route path="/login">
            <div className="content">
              <LoginPage />
            </div>
          </Route>
          <Route path="/users/add">
            <div className="content">
              <UserAdd />
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
