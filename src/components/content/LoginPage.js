import React from 'react';

const LoginPage = () => {
    return(
        <div className="row">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Edit Profile</h5>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6 pr-1">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" placeholder="Company" value="Mike"/>
                                    </div>
                                </div>
                                <div className="col-md-6 pl-1">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" className="form-control" placeholder="Last Name"
                                               value="Andrew"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;