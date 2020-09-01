import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { pageTitleState } from "../NavBar";
import AdminForm from "./AdminForm";

const Admins = () => {
  const [pageTitle, setPageTitle] = useRecoilState(pageTitleState);

  useEffect(() => {
    setPageTitle("Admin management");
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
              <AdminForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;
