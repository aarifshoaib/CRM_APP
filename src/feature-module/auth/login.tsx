import React, { useEffect, useState } from "react";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import { checkAuth } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../core/data/redux/store";

const Login = () => {
  const dispatch = useDispatch();
  const route = all_routes;
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [page, setPage] = useState({username: '', password: ''});
  

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleChange = (e : any) => {
    setPage({ ...page, [e.target.name]: e.target.value });
  };

  const signIn = async() => {
    if(page.username === '' || page.password === '') {
      return;
    }
    console.log(page);
    const resp = await dispatch(await checkAuth(page));
    //console.log(await store.getState().entities.auth.list);
  };



  return (
    <div className="account-content">
      <div className="d-flex flex-wrap w-100 vh-100 overflow-hidden account-bg-01">
        <div className="d-flex align-items-center justify-content-center flex-wrap vh-100 overflow-auto p-4 w-50 bg-backdrop">
          <form className="flex-fill">
            <div className="mx-auto mw-450">
              <div className="text-center mb-4">
                <ImageWithBasePath
                  src="assets/img/logo.svg"
                  className="img-fluid"
                  alt="Logo"
                />
              </div>
              <div className="mb-4">
                <h4>Sign In</h4>
                <p>Access the CRMS panel using your username and passcode.</p>
              </div>
              <div className="mb-3">
                <label className="col-form-label">username Address</label>
                <div className="position-relative">
                  <span className="input-icon-addon">
                    <i className="ti ti-mail"></i>
                  </span>
                  <input type="text" className="form-control" name= "username" onChange={handleChange} value={page.username} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Password</label>
                <div className="pass-group">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className="pass-input form-control"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                  <span
                    className={`ti toggle-password ${isPasswordVisible ? "ti-eye" : "ti-eye-off"
                      }`}
                    onClick={togglePasswordVisibility}
                  ></span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="form-check form-check-md d-flex align-items-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkebox-md"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="checkebox-md">
                    Remember Me
                  </label>
                </div>
                <div className="text-end">
                  <Link
                    to={route.forgotPassword}
                    className="text-primary fw-medium link-hover"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <div className="mb-3">
                <button
                  onClick={signIn}
                  type="button"
                  className="btn btn-primary w-100"
                >
                  Sign In
                </button>
              </div>


              <div className="text-center">
                <p className="fw-medium text-gray">Copyright © 2024 - CRMS</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



export default Login;
