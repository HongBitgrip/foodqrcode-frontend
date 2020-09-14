import React from "react";
import "./App.scss";
import "./components/Sidebar";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import LoginPage from "./components/content/LoginPage";
import { Route, Switch } from "react-router-dom";
import UserAdd from "./components/content/UserAdd";
import RestaurantAdminAdd from "./components/content/RestaurantAdminForm";
import RestaurantTypeForm from "./components/content/RestaurantTypeForm";
import RestaurantForm from "./components/content/RestaurantForm";
import Restaurants from "./components/content/Restaurants";
import Admins from "./components/content/Admins";

function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel" id="main-panel">
        <NavBar />
        <Header />
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
          <Route path="/admin/restaurants">
            <div className="content">
              <Restaurants />
            </div>
          </Route>
          <Route path="/admins/add">
            <div className="content">
              <Admins />
            </div>
          </Route>
          <Route path="/restaurant_admins/add">
            <div className="content">
              <RestaurantAdminAdd />
            </div>
          </Route>
          <Route path="/restaurant_types/add">
            <div className="content">
              <RestaurantTypeForm />
            </div>
          </Route>
          <Route path="/restaurants/add">
            <div className="content">
              <RestaurantForm />
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
