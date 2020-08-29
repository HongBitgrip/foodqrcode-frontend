import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import RestaurantAdd from "./RestaurantAdd";
import RestaurantTypeAdd from "./RestaurantTypeAdd";

const Restaurants = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          {/*<div className="card-header">*/}
          {/*  <h5 className="title">Restaurants Management</h5>*/}
          {/*</div>*/}
          <div className="card-body">
            <div>
              <Tabs
                defaultActiveKey="restaurants"
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="restaurants" title="Restaurants">
                  <RestaurantAdd />
                </Tab>
                <Tab eventKey="restaurantAdmins" title="Restaurant Admins">
                  <p>Test 2</p>
                </Tab>
                <Tab eventKey="restaurantTypes" title="Restaurant Types">
                  <RestaurantTypeAdd />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
