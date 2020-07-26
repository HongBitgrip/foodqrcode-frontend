import React from 'react';
import Auth from '../../service/auth.service';

const LoginPage = () => {
    return(
        <div className="row">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Admin Login</h5>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-md-6 pr-1">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control" placeholder="Email"/>
                                    </div>
                                </div>
                                <div className="col-md-6 pl-1">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="text" className="form-control" placeholder="Password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 pr-1">

                                </div>
                            </div>

                        </form>
                        <button className="btn btn-primary btn-block"
                                onClick={Auth.getToken}>Top Left
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;