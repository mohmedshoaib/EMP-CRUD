import React, { Component } from "react";
import "../Styles/Styles.css";
import { getProjects } from "../service/projectApi.js";
import AddProject from "./popUps/AddProjectPopUp";
import EditProject from "./popUps/EditProjectPopUp";
import { useEffect, useState } from "react";
import { edit, expt, impt, plus } from "../utils/icons";
import { toast, ToastContainer } from "react-toastify";

const AllProject = () => {
  const [projects, setProjects] = useState([]);
  const [showAddProj, setShowAddProj] = useState(false);
  const [showEditProj, setShowEditProj] = useState(false);
  const [reloadProj, setReloadProj] = useState(false);
  const [projId, setProjId] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllProjects();
    };
    fetchData();
  }, [showAddProj, reloadProj]);

  const getAllProjects = async () => {
    let response = await getProjects();
    setProjects(response.data);
    setFilteredData(response.data);
  };

  const openAddProjPopUp = () => {
    setShowAddProj(true);
  };
  const openEditProjPopUp = (id) => {
    setProjId(id);
    setShowEditProj(true);
    setReloadProj(true);
  };

  const getStatus = (e) => {
    console.log(e.target.value);
    if (e.target.value === 1) {
      console.log("Active");
      setStatus(1);
      return 1;
    } else if (e.target.value === 0) {
      console.log("Deactive");
      setStatus(0);
      return 0;
    } else if (e.target.value === 2) {
      console.log("All");
      setStatus(2);
      return 2;
    }
  };

  const handleFilter_by_projTitle_projDesc = (e) => {
    setProjects(
      filteredData.filter(
        (project) =>
          project.projTitle.includes(e.target.value) ||
          project.projDesc.includes(e.target.value)
      )
    );
  };

  const handleFilter_by_status = (e) => {
    // setFilteredData(

    //   // projects.filter((user) => user.status.includes(e.target.value))
    // );
    if (e.target.value === "InComplete") {
      setProjects(
        filteredData.filter((project) => {
          return project.status.toString().includes("0");
        })
      );
    }
    if (e.target.value === "Completed") {
      setProjects(
        filteredData.filter((project) => {
          return project.status.toString().includes("1");
        })
      );
    }
    if (e.target.value === "Select Status") {
      setProjects(
        filteredData.filter((project) => {
          return true;
        })
      );
    }
  };

  return (
    <>
      <div id="container">
        <div className="filter">
          <input
            className="search_inpt_1"
            type="text"
            placeholder="Search By Title"
            onChange={(e) => {
              setSearch(e.target.value);
              handleFilter_by_projTitle_projDesc(e);
            }}
          />
          {/* <input className="search_inpt_2" type="date" placeholder="Start date"/> */}
          <select
            className="search_inpt_2"
            onChange={(e) => {
              getStatus(e);
              handleFilter_by_status(e);
            }}
          >
            <option className="select-items">Select Status</option>
            <option className="select-items">Completed</option>
            <option className="select-items">InComplete</option>
          </select>
          {/* <button className="expt-btn">
            <span style={{ marginRight: 5 }}>{expt}</span>Export
          </button>
          <button className="impt-btn">
            <span style={{ marginRight: 5 }}>{impt}</span>import
          </button> */}
        </div>
        <div className="title-block">
          <h4 className="title-block-hd">Projects Details</h4>
          {/* {showAddProj && <AddProject setShowAddProj={setShowAddProj} />}
          {showEditProj && (
            <EditProject
              setShowEditProj={setShowEditProj}
              setReloadProj={setReloadProj}
              projId={projId}
            />
          )} */}
          {/* <i className="add-proj-btn" onClick={() => openAddProjPopUp()} >{plus}</i> */}
          <button className="add-proj-btn" onClick={() => openAddProjPopUp()}>
            New Project
          </button>
        </div>
        <div className="cd-div">
          <table className="cd-table" cellspacing="0">
            <thead>
              <tr>
                <th>sr.no</th>
                <th>Project-ID</th>
                <th>Project-Title</th>
                <th>Project-Desc</th>
                <th>TimeStamp</th>
                <th>Status</th>
                <th>Start-Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects
                .filter((project) => {
                  const isNameMatch =
                    search === "" ? true : project.projTitle.includes(search);
                  const isEmailMatch =
                    search === "" ? true : project.projDesc.includes(search);
                  const isStatusMatch =
                    status === 2 ? true : project.status.includes(status);
                  // let isRegDateMatch = true;
                  // if (startDate !== "" && endDate !== "") {
                  //   isRegDateMatch = user.reg_date >= startDate && user.reg_date <= endDate;
                  // } else if (startDate !== "") {
                  //   isRegDateMatch = user.reg_date === startDate;
                  // } else if (endDate !== "") {
                  //   isRegDateMatch = user.reg_date === endDate;
                  // }
                  return (isNameMatch || isEmailMatch) && isStatusMatch;
                })
                .map((project, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{project._id}</td>
                    <td>{project.projTitle}</td>
                    <td>{project.projDesc}</td>
                    <td>{project.timeStamp}</td>
                    <td>
                      {project.status === "1" ? "Completed" : "InComplete"}
                    </td>
                    <td>{project.start_date}</td>
                    <td>
                      {showAddProj && (
                        <AddProject setShowAddProj={setShowAddProj} />
                      )}
                      {showEditProj && (
                        <EditProject
                          setShowEditProj={setShowEditProj}
                          setReloadProj={setReloadProj}
                          projId={projId}
                        />
                      )}
                      <button
                        className="edit-btn"
                        onClick={() => openEditProjPopUp(project._id)}
                      >
                        {edit}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        limit={0}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AllProject;
