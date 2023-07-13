import React, { Component } from "react";
import "../Styles/Styles.css";
import { FormControl, FormControlLabel } from "@mui/material";
import { IOSSwitch } from "./SwitchButton";
import {
  getUsers,
  getSalaries,
  deleteUser,
  delSalary,
  editStatus,
} from "../service/api.js";
import { useEffect, useState } from "react";
import { edit, expt, impt, addSal, del, plus } from "../utils/icons";
import { toast, ToastContainer } from "react-toastify";
import AddSal from "./popUps/AddSalaryPopUp";
import AddEmp from "./popUps/AddEmpPopUp";
// import ImportCsvPopUp from "./popUps/ImportCsvPopUp";
import PopUp from "./PopUp";
import EditEmp from "./popUps/EditEmpPopUp";
import { CSVLink } from "react-csv";
import { Link, redirect } from "react-router-dom";
const AllEmp = () => {
  const [users, setUsers] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [showAddEmp, setShowAddEmp] = useState(false);
  const [showEditEmp, setShowEditEmp] = useState(false);
  const [showAddSal, setShowAddSal] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [reloadEmp, setReloadEmp] = useState(false);
  const [reloadAddEmp, setReloadAddEmp] = useState(false);
  const [reloadAddSal, setReloadAddSal] = useState(false);
  const [editId, setEditId] = useState("");

  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [salId, setSalId] = useState("");
  // console.log(reloadEmp);
  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
    };
    const fetchData1 = async () => {
      await getAllSalaries();
    };
    fetchData();
    fetchData1();
  }, [
    showAddEmp,
    showEditEmp,
    showImport,
    reloadEmp,
    reloadAddEmp,
    reloadAddSal,
    isClick,
    show,
  ]);

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
    setFilteredData(response.data);
  };

  const getAllSalaries = async () => {
    let response = await getSalaries();
    setSalaries(response.data);
  };

  const openAddSalPopUp = (id) => {
    console.log(id);
    setSalId(id);
    setShowAddSal(true);
    setReloadAddSal(true);
  };

  const openAddEmpPopUp = () => {
    setShowAddEmp(true);
    setReloadAddEmp(true);
  };

  const openImport = () => {
    setShowImport(true);
  };

  const openEditEmpPopUp = (id) => {
    // console.log(id)
    setEditId(id);
    setShowEditEmp(true);
    setReloadEmp(true);
  };

  const deleteUserDetails = async (id) => {
    alert("Are you Sure you want to delete the User?");
    await deleteUser(id);
    await delSalary(id);
    toast.error("Employee Deleted", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    getAllUsers();
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

  const getStartDate = (e) => {
    const currentDate = e;
    setStartDate(currentDate);
  };

  const getEndDate = (e) => {
    const currentDate = e;
    setEndDate(currentDate);
  };

  const display3 = (user, id) => {
    const userSalary = salaries.find((salary) => salary.user_id === id);
    if (userSalary) {
      return userSalary.salary;
    } else {
      return null;
    }
    //  else {
    //   return (
    //     "Not Added"
    //     // <button className="edit-btn" onClick={() => openAddSalPopUp()} >
    //     //   <span style={{ marginLeft: 8 }}></span>
    //     //   {addSal}
    //     // </button>
    //   );
    // }
  };

  const handleFilter_by_name_email = (e) => {
    setFilteredData(
      users.filter(
        (user) =>
          user.name.includes(e.target.value) ||
          user.email.includes(e.target.value)
      )
    );
  };

  const handleFilter_by_address_phone = (e) => {
    setFilteredData(
      users.filter(
        (user) =>
          user.address.includes(e.target.value) ||
          user.phone.includes(e.target.value)
      )
    );
  };

  const handleFilter_by_startDate_endDate = (e) => {
    setFilteredData(
      users.filter((user) => user.reg_date.includes(e.target.value))
    );
  };

  const handleFilter_by_status = (e) => {
    if (e.target.value === "Active") {
      setUsers(
        filteredData.filter((user) => {
          return user.status.toString().includes("1");
        })
      );
    }
    if (e.target.value === "InActive") {
      setUsers(
        filteredData.filter((user) => {
          return user.status.toString().includes("0");
        })
      );
    }
    if (e.target.value === "Select Status") {
      setUsers(
        filteredData.filter((user) => {
          return true;
        })
      );
    }
  };

  const aptStatus = async (id) => {
    await editStatus(id);
    setIsClick((prev) => !prev);
  };

  const ActiveSwitch = ({ userId, setIsClick }) => (
    <FormControl>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        onChange={() => aptStatus(userId)} // Call aptStatus function with userId on switch change
      />
    </FormControl>
  );

  const DeActiveSwitch = ({ userId, setIsClick }) => (
    <FormControl>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} />}
        onChange={() => aptStatus(userId)} // Call aptStatus function with userId on switch change
      />
    </FormControl>
  );

  const openPop = () => {
    setShow(true);
  };

  return (
    <>
      <div id="container">
        <div className="filter">
          <input
            className="search_inpt_1"
            type="text"
            placeholder="Search By Name"
            onChange={(e) => {
              setSearch(e.target.value);
              handleFilter_by_name_email(e);
            }}
          />
          <input
            className="search_inpt_2"
            type="text"
            placeholder="Search By Address"
            onChange={(e) => {
              setSearch1(e.target.value);
              handleFilter_by_address_phone(e);
            }}
          />
          <input
            className="search_inpt_3"
            type="date"
            placeholder="Start date"
            onChange={(e) => {
              getStartDate(e.target.value);
              handleFilter_by_startDate_endDate(e);
            }}
          />
          <input
            className="search_inpt_4"
            type="date"
            placeholder="End date"
            onChange={(e) => {
              getEndDate(e.target.value);
              handleFilter_by_startDate_endDate(e);
            }}
          />
          <select
            className="search_inpt_5"
            onChange={(e) => {
              getStatus(e);
              handleFilter_by_status(e);
            }}
          >
            <option className="select-items">Select Status</option>
            <option className="select-items">Active</option>
            <option className="select-items">InActive</option>
          </select>
          {users.length === filteredData.length ? (
            <button className="expt-btn">
              <span style={{ marginRight: 5 }}>{expt}</span>
              <a
                href="http://localhost:5000/all/export/data.csv"
                style={{ textDecoration: "none", fontSize: 15, color: "white" }}
              >
                Export
              </a>
            </button>
          ) : (
            <button className="expt-btn">
              <span style={{ marginRight: 5 }}>{expt}</span>
              <CSVLink
                data={filteredData}
                filename="data"
                style={{ textDecoration: "none", fontSize: 15, color: "white" }}
              >
                Export
              </CSVLink>
            </button>
          )}
          <button className="impt-btn" onClick={() => openPop()}>
            <span style={{ marginRight: 5 }}>{impt}</span>Import
          </button>
        </div>

        <div className="title-block">
          <h4 className="title-block-hd">Employees Details</h4>
          <button className="add-proj-btn" onClick={() => openAddEmpPopUp()}>
            New Employee
          </button>
        </div>
        <div className="cd-div">
          <table className="cd-table" cellspacing="0">
            <thead>
              <tr>
                <th>sr.no</th>
                <th>Employee-ID</th>
                <th>Emp Image</th>
                <th>Employee-Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Entry Date</th>
                <th>Status</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => {
                  const isNameMatch =
                    search === "" ? true : user.name.includes(search);
                  const isEmailMatch =
                    search === "" ? true : user.email.includes(search);
                  const isAddressMatch =
                    search1 === "" ? true : user.address.includes(search1);
                  const isPhoneMatch =
                    search1 === "" ? true : user.phone.includes(search1);
                  const isStatusMatch =
                    status === 2 ? true : user.status.includes(status);
                  let isRegDateMatch = true;
                  if (startDate !== "" && endDate !== "") {
                    isRegDateMatch =
                      user.reg_date >= startDate && user.reg_date <= endDate;
                  } else if (startDate !== "") {
                    isRegDateMatch = user.reg_date === startDate;
                  } else if (endDate !== "") {
                    isRegDateMatch = user.reg_date === endDate;
                  }
                  return (
                    (isNameMatch || isEmailMatch) &&
                    (isAddressMatch || isPhoneMatch) &&
                    isStatusMatch &&
                    isRegDateMatch
                  );
                })
                .map((user, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>
                      <div className="emp-img-div">
                        <img src={user.image} alt="image" className="emp-img" />
                      </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                    <td>{user.reg_date}</td>
                    <td>
                      {user.status === "1" ? (
                        <ActiveSwitch userId={user._id} key={user.status} />
                      ) : (
                        <DeActiveSwitch userId={user._id} key={user.status} />
                      )}
                    </td>
                    <td>
                      {/* {showImport && <ImportCsvPopUp setShow={setShowImport} />} */}
                      {showAddSal && (
                        <AddSal
                          setShowAddSal={setShowAddSal}
                          salId={salId}
                          setReloadAddSal={setReloadAddSal}
                        />
                      )}
                      {display3(user, user._id) === null ? (
                        <button
                          className="edit-btn"
                          onClick={() => openAddSalPopUp(user._id)}
                        >
                          <span style={{ marginLeft: 8 }}></span>
                          {addSal}
                        </button>
                      ) : (
                        display3(user, user._id)
                      )}
                    </td>
                    <td>
                      {showEditEmp && (
                        <EditEmp
                          setShowEditEmp={setShowEditEmp}
                          setReloadEmp={setReloadEmp}
                          editId={editId}
                        />
                      )}
                      <button
                        className="edit-btn"
                        style={{ marginRight: 10 }}
                        onClick={() => openEditEmpPopUp(user._id)}
                      >
                        {edit}
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => deleteUserDetails(user._id)}
                      >
                        {del}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {showAddEmp && (
          <AddEmp
            setShowAddEmp={setShowAddEmp}
            setReloadAddEmp={setReloadAddEmp}
          />
        )}
        {show && <PopUp setShow={setShow} />}
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

export default AllEmp;
