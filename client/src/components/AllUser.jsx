import React, { Component } from "react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../Styles/style.css";
import { toast, ToastContainer } from "react-toastify";
import PopUp from "./PopUp";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  styled,
  Button,
  TextField,
  Stack,
  FormControl,
  MenuItem,
  Select,
  FormControlLabel,
  FormGroup,
  Input,
} from "@mui/material";
import {
  getUsers,
  deleteUser,
  getSalaries,
  editStatus,
  getUser,
  delSalary,
} from "../service/api";
import { Link, redirect } from "react-router-dom";
import "../App.css";
import { edit, del, addSal, expt, impt } from "../utils/icons";
import { IOSSwitch } from "./SwitchButton";
import { CSVLink } from "react-csv";
const WhiteBorderTextField = styled(TextField)`
  color: inherit;
  font-size: 15px;
  margin-right: 20px;
  box-sizing: content-box;
  fontweight: 500;
  & > input {
    height: 25px;
    width: 100.359;
    padding-top: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }
`;

const Container = styled(Table)`
  width: 92%;
  margin: 1% auto 0 auto;
  border-radius: 5px;
  & > div {
    margin-top: 10px;
    & > div {
      margin-top: 10px;
    }
  }
`;

const FilterContainer = styled(Stack, WhiteBorderTextField)`
    width: 90%,
    margin: 1% auto 0 auto;
    border-radius: 5px;
`;

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [salaries, setSalaries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [isClick, setIsClick] = useState(false);
  // console.log(startDate);
  // console.log(endDate);
  // console.log(search1);
  // console.log(search);
  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
    };
    const fetchData1 = async () => {
      await getAllSalaries();
    };
    fetchData();
    fetchData1();
  }, [show, isClick]);

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
    setFilteredData(response.data);
    // console.log(response.data)
  };
  // console.log(users);

  const getAllSalaries = async () => {
    let response = await getSalaries();
    setSalaries(response.data);
    // console.log(response.data)
  };
  // console.log(salaries);

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

  // Pagination in React
  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(users.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const display3 = (user, id) => {
    const userSalary = salaries.find((salary) => salary.user_id === id);
    if (userSalary) {
      return userSalary.salary;
    } else {
      return (
        <Button component={Link} to={`/salary/${user._id}`}>
          {addSal}
        </Button>
      );
    }
  };

  const aptStatus = async (id) => {
    await editStatus(id);
    setIsClick(prev => !prev)
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

  const display = users
    .filter((user) => {
      const isNameMatch = search === "" ? true : user.name.includes(search);
      const isEmailMatch = search === "" ? true : user.email.includes(search);
      const isAddressMatch =
        search1 === "" ? true : user.address.includes(search1);
      const isPhoneMatch = search1 === "" ? true : user.phone.includes(search1);
      const isStatusMatch = status === 2 ? true : user.status.includes(status);
      let isRegDateMatch = true;
      if (startDate !== "" && endDate !== "") {
        isRegDateMatch = user.reg_date >= startDate && user.reg_date <= endDate;
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
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((user, index) => (
      <TableRow key={user._id}>
        <TableCell>{index + pagesVisited + 1}</TableCell>
        <TableCell>{user._id}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.address}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{user.reg_date}</TableCell>
        <TableCell>
          {user.status === "1" ? (
            <ActiveSwitch userId={user._id} setIsClick={setIsClick} key={user.status}/>
          ) : (
            <DeActiveSwitch userId={user._id} setIsClick={setIsClick} key={user.status}/>
          )}
        </TableCell>
        <TableCell>{display3(user, user._id)}</TableCell>
        <TableCell>
          <Button component={Link} to={`/edit/${user._id}`}>
            {edit}
          </Button>
          <Button onClick={() => deleteUserDetails(user._id)}>{del}</Button>
        </TableCell>
      </TableRow>
    ));

  const display1 = users
    .filter((user) => {
      const isNameMatch = search === "" ? true : user.name.includes(search);
      const isEmailMatch = search === "" ? true : user.email.includes(search);
      const isAddressMatch =
        search1 === "" ? true : user.address.includes(search1);
      const isPhoneMatch = search1 === "" ? true : user.phone.includes(search1);
      const isStatusMatch = status === 2 ? true : user.status.includes(status);
      let isRegDateMatch = true;
      if (startDate !== "" && endDate !== "") {
        isRegDateMatch = user.reg_date >= startDate && user.reg_date <= endDate;
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
      <TableRow key={user._id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{user._id}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.address}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{user.reg_date}</TableCell>
        <TableCell>
          {user.status === "1" ? (
            <ActiveSwitch userId={user._id} key={user.status}/>
          ) : (
            <DeActiveSwitch userId={user._id} key={user.status}/>
          )}
        </TableCell>
        <TableCell>{display3(user, user._id)}</TableCell>
        <TableCell>
          <Button component={Link} to={`/edit/${user._id}`}>
            {edit}
          </Button>
          <Button onClick={() => deleteUserDetails(user._id)}>{del}</Button>
        </TableCell>
      </TableRow>
    ));

  const display2 = (
    <ReactPaginate
      previousLabel={"Previous"}
      nextlabel={"Next"}
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName={"paginationBttns"}
      previousLinkClassName={"previousBttn"}
      nextLinkClassName={"nextBttn"}
      disabledClassName={"paginationDisabled"}
      activeClassName={"paginationActive"}
    />
  );

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
    setFilteredData(
      users.filter((user) => user.status.includes(e.target.value))
    );
  };

  const openPop = () => {
    setShow(true);
  };

  return (
    <>
      <div id="container" style={{ marginTop: 50 }}>
        <div className="search_filter">
          <input
            type="text"
            className="search_input"
            placeholder="Search by Name"
            onChange={(e) => {
              setSearch(e.target.value);
              handleFilter_by_name_email(e);
            }}
          />
          <input
            type="text"
            className="search_input"
            placeholder="Search by Address"
            onChange={(e) => {
              setSearch1(e.target.value);
              handleFilter_by_address_phone(e);
            }}
          />
          <input
            type="date"
            className="search_input"
            placeholder="Start Date"
            onChange={(e) => {
              getStartDate(e.target.value);
              handleFilter_by_startDate_endDate(e);
            }}
          />
          <input
            type="date"
            className="search_input"
            placeholder="End Date"
            onChange={(e) => {
              getEndDate(e.target.value);
              handleFilter_by_startDate_endDate(e);
            }}
          />
          <Select
            className="search_input_status"
            defaultValue={2}
            onChange={(e) => {
              getStatus(e);
              handleFilter_by_status(e);
            }}
          >
            <MenuItem className="search_options" value={2}>
              All
            </MenuItem>
            <MenuItem className="search_options" value={1}>
              Active
            </MenuItem>
            <MenuItem className="search_options" value={0}>
              In active
            </MenuItem>
          </Select>
          {users.length === filteredData.length ? (
            <button className="export_data">
              <span style={{ marginRight: 5 }}>{expt}</span>
              <a
                href="http://localhost:5000/all/export/data.csv"
                style={{ textDecoration: "none", fontSize: 15, color: "white" }}
              >
                Export
              </a>
            </button>
          ) : (
            <button className="export_data">
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
          {show && <PopUp setShow={setShow} />}
          <button className="export_data" onClick={() => openPop()}>
            <span style={{ marginRight: 5 }}>{impt}</span>Import
          </button>
        </div>
      </div>
      <h4
        style={{
          marginLeft: 55,
          background: "#00235B",
          marginRight: 55,
          paddingTop: 5,
          paddingBottom: 5,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          height: 25,
        }}
      >
        <center>
          <b style={{ color: "white" }}>Employees detail</b>
        </center>
      </h4>
      <Container
        fixed
        sx={{
          boxShadow: 3,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          p: 5,
          marginTop: -2.5,
        }}
      >
        <Table
          style={{ margin: "auto", border: "1px solid white" }}
          id="UserDataExpUse"
        >
          <TableHead sx={{ background: "#white" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>sr.no</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Entry Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {search !== "" ||
            search1 !== "" ||
            status === 1 ||
            status === 0 ||
            startDate !== "" ||
            endDate !== ""
              ? display1
              : display}
          </TableBody>
        </Table>
        {search !== "" ||
        search1 !== "" ||
        status === 1 ||
        status === 0 ||
        startDate !== "" ||
        endDate !== ""
          ? true
          : display2}
      </Container>
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

export default AllUser;
