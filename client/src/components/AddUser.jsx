import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
  Tab,
  Toolbar,
  Stack,
} from "@mui/material";
import { Shadows } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import { useState } from "react";
import { addUser } from "../service/api";
import { NavLink, useNavigate } from "react-router-dom";
import { close } from "../utils/icons";
import React from "react";
import "../Styles/style.css"
const Container = styled(FormGroup)`
  margin: 3% auto 0 auto;
  & > div {
    margin-top: 25px;
    & > div {
      margin-top: 20px;
    }
  }
`;

const Tabs = styled(NavLink)`
  font-size: 20px;
  color: inherit;
  text-decoration: none;
`;

// const currentDate = new Date()
const defaultValue = {
  name: "",
  email: "",
  address: "",
  phone: "",
  status: "1",
  reg_date: new Date().toISOString().split("T")[0],
};

// AddUser main Function
const AddUser = () => {
  const [user, setUser] = useState(defaultValue);
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const addUserDetails = () => {
    addUser(user);
    toast.success(" Added Employee ", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/all");
  };

  const cancel = () => {
    toast.warn("Employee not Added", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/all");
  };

  return (
    <>
      <Container
        className="addcont"
        sx={{ boxShadow: 3, borderRadius: 1, p: 5 }}
        style={{
          paddingTop: 40,
          paddingBottom: 5,
          marginTop: 90,
          position: "relative",
          maxHeight: 500,
          maxWidth: 350,
          minWidth: 200,
          minHeight: 300,
        }}
      >
        <Typography variant="h4">
          <center>Add Employee</center>
        </Typography>

        <FormGroup sx={{ position: "relative" }}>
          <FormControl>
            <InputLabel>Name</InputLabel>
            <Input
              sx={{ position: "relative" }}
              style={{ minWidth: 100 }}
              onChange={(e) => onValueChange(e)}
              name="name"
            />
          </FormControl>
          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input
              sx={{ position: "relative" }}
              style={{ minWidth: 100 }}
              onChange={(e) => onValueChange(e)}
              name="email"
            />
          </FormControl>
          <FormControl>
            <InputLabel>Address</InputLabel>
            <Input
              sx={{ position: "relative" }}
              style={{ minWidth: 100 }}
              onChange={(e) => onValueChange(e)}
              name="address"
            />
          </FormControl>
          <FormControl>
            <InputLabel>Phone</InputLabel>
            <Input
              sx={{ position: "relative" }}
              style={{ minWidth: 100 }}
              onChange={(e) => onValueChange(e)}
              name="phone"
            />
          </FormControl>
          <FormControl>
            <Stack direction={"row"}>
              <Button
                variant="contained"
                onClick={() => addUserDetails()}
                sx={{ width: 1, marginRight: 1 }}
              >
                Add User
              </Button>
              <Button
                variant="contained"
                sx={{ width: 1 }}
                onClick={() => cancel()}
              >
                cancel
              </Button>
            </Stack>
          </FormControl>
        </FormGroup>
      </Container>
    </>
  );
};

export default AddUser;
