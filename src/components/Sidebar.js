import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar" data-color="orange">
            <div className="logo">
                <a href="http://www.creative-tim.com" className="simple-text logo-mini">
                    CT
                </a>
                <a href="http://www.creative-tim.com" className="simple-text logo-normal">
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
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;