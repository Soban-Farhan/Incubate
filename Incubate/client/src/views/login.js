import React from 'react';
import '../css/master.css'

function Login() {
    return (
      <div className="container v-center">
        <div className="card" style={{ boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.15)" }}>
          <img className="card-img-top img-fluid" src="" alt="Image Banner" />
          <div className="card-body">
              <form>
                  <div className="p-2">
                  </div>
                  <div className="row">
                      <div className="col-lg-2">
                      </div>
                      <div className="col-lg-8">
                          <div className="row">
                              <div className="col-lg-2 text-left">
                                  <label> <b> Email </b> </label>
                              </div>
                              <div className="">
                              </div>
                              <div className="col-lg-10">
                                  <input />
                                  <div style={{ color: "red" }}>
                                      <p>Login Error</p>
                                  </div>
                              </div>
                          </div>
                          <p className="p-2"></p>
                          <div className="row">
                              <div className="col-lg-2">
                                  <label> <b> Password </b> </label>
                              </div>
                              <div className="col-lg-10">
                                  <input />
                                  <div style={{ color: "red" }}>
                                    <p>Password Error</p>
                                  </div>
                                  <div style={{ color: "red" }}>
                                      <p>Other Error</p>
                                  </div>
                              </div>
                          </div>
                          <p className="p-1"></p>
                          <div className="row">
                              <div className="col-lg-10 offset-lg-2 text-right">
                                  <button type="submit" className="btn btn-outline-dark btn-md"> Login </button>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-2">
                      </div>
                      <p className="p-1"></p>
                  </div>
              </form>
          </div>
        </div>
      </div>
    );
}

export default Login;