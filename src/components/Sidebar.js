import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar" data-color="orange">
      <div className="logo">
        <a href="http://www.creative-tim.com" className="simple-text logo-mini">
          CT
        </a>
        <a
          href="http://www.creative-tim.com"
          className="simple-text logo-normal"
        >
          Creative Tim
        </a>
      </div>
      <div className="sidebar-wrapper" id="sidebar-wrapper">
        <ul className="nav">
          <li>
            <a href="./dashboard.html">
              <i className="now-ui-icons design_app"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li>
            <a href="./icons.html">
              <i className="now-ui-icons education_atom"></i>
              <p>Icons</p>
            </a>
          </li>
          <li>
            <a href="./map.html">
              <i className="now-ui-icons location_map-big"></i>
              <p>Maps</p>
            </a>
          </li>
          <li>
            <Link to="/users/add">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/admins/add">Admin Accounts</Link>
          </li>
          <li>
            <Link to="/admin/restaurants">Restaurants</Link>
          </li>
          <li>
            <Link to="/restaurant_admins/add">Restaurant Admin Add</Link>
          </li>
          <li>
            <Link to="/restaurant_types/add">Restaurant Type Add</Link>
          </li>
          <li>
            <Link to="/restaurants/add">Restaurant Add</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
