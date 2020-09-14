import React, { useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import RestaurantForm from "./RestaurantForm";
import RestaurantTypeForm from "./RestaurantTypeForm";
import RestaurantAdminAdd from "./RestaurantAdminForm";
import { useRecoilState } from "recoil";
import { pageTitleState } from "../NavBar";

const Restaurants = () => {
  const [pageTitle, setPageTitle] = useRecoilState(pageTitleState);

  useEffect(() => {
    setPageTitle("Restaurant management");
    return () => {
      setPageTitle("");
    };
  }, [setPageTitle]);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div>
              <Tabs
                defaultActiveKey="restaurants"
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="restaurants" title="Restaurants">
                  <RestaurantForm />
                </Tab>
                <Tab eventKey="restaurantAdmins" title="Restaurant Admins">
                  <RestaurantAdminAdd />
                </Tab>
                <Tab eventKey="restaurantTypes" title="Restaurant Types">
                  <RestaurantTypeForm />
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
