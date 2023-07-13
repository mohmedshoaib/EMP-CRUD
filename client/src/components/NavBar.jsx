// import { AppBar, Toolbar, TextField, Button } from "@mui/material";
// import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
// import React from "react";
// import styled from '@emotion/styled'; 
// import { useState } from "react";
// import { home, bar, x_mark, dash, proj, emp } from "../utils/icons";
// import "../Styles/style.css";

// const Header = styled(AppBar)`
//   background: #181823;
//   height: 50px;
// `;

// const Tabs = styled(NavLink)`
//   font-size: 20px;
//   margin-right: 20px;
//   color: inherit;
//   text-decoration: none;
// `;

// const SideBar = styled.div`
//   position: fixed;
//   top: 0;
//   left: ${(props) => props.sidebarLeft};
//   width: 250px;
//   height: 100%;
//   background-color: #181823;
//   transition: left 0.3s ease-in-out;
//   z-index: 4;
// `;

// const CloseButton = styled.button`
//   background: #181823;
//   color: white;
//   position: absolute;
//   right: 10px;
//   top: 10px;
//   cursor: pointer;
//   border-radius: 20%;
//   width: 30px;
//   height: 30px;
//   line-height: 20px !important;
//   text-align: center;
//   border: none;
// `;

// const SideBarContent = styled.div`
//   padding: 20px;
//   color: #fff;
//   ul {
//     list-style: none;
//     padding: 0;
//     background: transperent;
//     marginTop: 10;
//   }
//   li {
//     margin-bottom: 10px;
//     text-decoration: none;
//     color: white;
//   }
//   .dropdown {
//     position: relative;
//     text-decoration: none;
//     cursor: pointer;
//   }
//   .dropdown-content {
//     display: none;
//     position: absolute;
//     background-color: #f9f9f9;
//     min-width: 160px;
//     box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.8);
//     z-index: 1;
//     margin-top: 10px;
//     border-radius: 4px;
//     opacity: 0;
   
//   }
//   .dropdown.active ~ .dropdown {
//     margin-top: 80px; /* Adjust the appropriate height for the desired positioning */
//     border-radius: 4px;
//     transition: margin-top 0s ease-in-out;
//   }
//   .dropdown.active .dropdown-content {
//     display: block;
//     opacity: 1;
//     border-radius: 4px;
//     background-color: #f6f6f6;
//     transition: opacity 0.3s ease-in-out;
//   }
//   .dropdown-content a {
//     color: black;
//     padding: 12px 16px;
//     text-decoration: none;
//     display: block;
//   }
//   .dropdown-content a:hover:first-child {
//     background-color: rgb(74, 90, 230);
//     border-top-left-radius: 3px;
//     border-top-right-radius: 3px;
//   }
  
//   .dropdown-content a:hover:last-child {
//     background-color: rgb(74, 90, 230);
//     border-bottom-left-radius: 3px;
//     border-bottom-right-radius: 3px;
//   }
  
// `;

// const NavBar = () => {
//     const [sidebarLeft, setSidebarLeft] = useState("-250px");
//     const [showList, setShowList] = useState(false);
  
//     const showBar = () => {
//       setSidebarLeft("0px");
//     };
  
//     const hideBar = () => {
//       setSidebarLeft("-250px");
//     };

//     const handleDropdownClick = (e) => {
//       e.currentTarget.classList.toggle('active');
//     };

//   return (
//     <>
//     <div className="navbar-cont">
//       <Header style={{ position: "fixed", zIndex: 3 }}>
//         <Toolbar>
//           <Tabs
//             style={{ marginRight: 10, marginLeft: -10, marginBottom: 12 }}
//             onClick={showBar}
//           >
//             {bar}
//           </Tabs>
//         </Toolbar>
//       </Header>
//       <SideBar id="sidebar" sidebarLeft={sidebarLeft}>
//         <CloseButton onClick={hideBar}>
//           {x_mark}
//         </CloseButton>
//         <SideBarContent>
//         {/* Sidebar content goes here */}
//         <ul className="side-bar-list">
//           <li className="side-bar-content"><NavLink to="/" style={{textDecoration: 'none', color: 'white'}}>{home}<span style={{marginLeft: 5, }}>Home</span></NavLink></li>
//           <li className="side-bar-content"><NavLink to="/dasboard" style={{textDecoration: 'none', color: 'white'}}>{dash}<span style={{marginLeft: 5, }}>Dashboard</span></NavLink></li>
//           <li className="side-bar-content"><NavLink to="/all-projects" style={{textDecoration: 'none', color: 'white'}}>{proj}<span style={{marginLeft: 5, }}>Project</span></NavLink></li>
//           <li className="dropdown side-bar-content" onClick={handleDropdownClick}>
//           {emp}<span style={{marginLeft: 5, marginRight: 78}}>Employee</span>
//           <div className="dropdown-content">
//             <Link to="/all">All Employees</Link>
//             <Link to="/add">Add Employee</Link>
//           </div>
//         </li>
//         </ul>
//         </SideBarContent>
//       </SideBar>
//       </div>
//     </>
//   );
// };

// export default NavBar;
