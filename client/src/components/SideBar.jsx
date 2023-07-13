import React from "react";
import { bar, ico, dash, log, sett, proj, home, emp, grid } from "../utils/icons";
import "../Styles/Styles.css";
import { useRef, useState } from "react";
import profile from "./images/images.png";
import AllEmp from "./AllEmp";
import AllProject from "./AllProject";
import About from "./About";

import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const SideBar = () => {
    const [showPage, setShowPage] = useState("");
    const [showHome, setShowHome] = useState("");
    const [showDashboard, setShowDashboard] = useState("");
    const [showEmp, setShowEmp] = useState("");
    const [showProj, setShowProj] = useState("");
  const elementRef = useRef();
  const showSideBar = () => {
    // console.log(elementRef.current)
    // elementRef.current.classList.add("sidebar")
    elementRef.current.classList.toggle("active");
  };

  console.log(showPage);
  const redirectHome = () => {
    setShowPage("Home")
    // if(showHome === false) {
    //     setShowHome(true)
    // } else {
    //     setShowEmp(false)
    // }
  }

  const redirectDashboard = () => {
    setShowPage("Dashboard")
    // if(showEmp === "") {
    //     setShowEmp("Dashboard")
    // } else {
    //     setShowEmp("").then(() => setShowEmp("Dashboard"))
    // }
  }

  const redirectAllEmp = () => {
    setShowPage("Emp")
    // if(showEmp === "") {
    //     setShowEmp("AllEmp")
    // } else {
    //     setShowEmp("")
    // }
  }

  const redirectAllproject = () => {
    setShowPage("Proj")
    // if(showProj === "") {
    //     setShowProj("AllProject")
    // } else {
    //     setShowProj("")
    // }
  }

  return (
    <>
      <div ref={elementRef} className="sidebar">
        <div className="top">
          <div className="logo">
            <i>{ico}</i>
            <span>Employee System</span>
          </div>
          <i id="btn" onClick={showSideBar}>
            {bar}
          </i>
        </div>
        <div className="user">
          <img src={profile} alt="me" className="user-img" />
          <div>
            <p className="bold">Mohmed</p>
            <p>Admin</p>
          </div>
        </div>
        <ul>
          <li>
            <NavLink to="/" onClick={() => redirectHome()}>
              <i>{home}</i>
              <span className="nav-item" >Home</span>
            </NavLink>
            <span className="tooltip">Home</span>
          </li>
          <li>
            <NavLink to="/dasboard" onClick={() => redirectDashboard()}>
              <i>{dash}</i>
              <span className="nav-item">Dashboard</span>
            </NavLink>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <NavLink to="/all-emp" onClick={() => redirectAllEmp()}>
              <i>{emp}</i>
              <span className="nav-item">Employees</span>
            </NavLink>
            <span className="tooltip">Employees</span>
          </li>
          <li>
            <NavLink to="/all-projects" onClick={() => redirectAllproject()}>
              <i>{proj}</i>
              <span className="nav-item">Projects</span>
            </NavLink>
            <span className="tooltip">Projects</span>
          </li>
          <li>
            <NavLink to="/all-">
              <i>{grid}</i>
              <span className="nav-item">WorkEntry</span>
            </NavLink>
            <span className="tooltip">WorkEntry</span>
          </li>
          <li>
            <NavLink to="#">
              <i>{sett}</i>
              <span className="nav-item">Settings</span>
            </NavLink>
            <span className="tooltip">Settings</span>
          </li>
          <li>
            <NavLink to="#">
              <i>{log}</i>
              <span className="nav-item">LogOut</span>
            </NavLink>
            <span className="tooltip">LogOut</span>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="container">
            {
                showPage === "Home" ? (<About/>) : showPage === "Emp" ? (<AllEmp/>) : showPage === "Proj" ? (<AllProject/>) : (<h1>Page Not Created yet !!!</h1>)
                
            }

        {/* <AllEmp /> */}
          {/* <h1>Code</h1>
          <h1>Right</h1> */}
        </div>
      </div>
    </>
  );
};

export default SideBar;
