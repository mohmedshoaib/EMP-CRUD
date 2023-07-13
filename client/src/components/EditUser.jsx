import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import { editUser, getUser, getSalaries, editSalary } from "../service/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { editUserStatus } from "./SwitchButton";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import "../Styles/style.css";

const Container = styled(FormGroup)`
  margin: 3% auto 0 auto;
  & > div {
    margin-top: 40px;
    & > div {
      margin-top: 20px;
    }
  }
`;

const defaultValue = {
  name: "",
  email: "",
  address: "",
  phone: "",
};

const defaultValue1 = {
  user_id: "",
  salary: "",
};

// Edit User main Function
const EditUser = () => {
  const [user, setUser] = useState(defaultValue);
  const [salary, setSalary] = useState(defaultValue1);

  // console.log(salary.user_id)
  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onValueChange1 = (e) => {
    setSalary({ ...salary, [e.target.name]: e.target.value });
    // setSalary((prev) => {
    //     return {
    //         ...prev, [e.target.name]: e.target.value
    //     }
    // })
  };

  const navigate = useNavigate();
  const { id } = useParams();
  //   const location = useLocation().pathname.split("/")[2];
  //   console.log(typeof location);
  // const sal_id = useParams().id;
  // const id1 = parseInt(sal_id)
  // console.log(typeof(id1))

  useEffect(() => {
    const fecthData2 = async () => {
      await loadUserDetails();
    };
    fecthData2();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const URL_T = `http://localhost:5000/sal/${id}`;
      try {
        const { data } = await axios.get(URL_T);
        setSalary(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUser(id);
    setUser(response.data);
  };

  const editUserDetails = () => {
    // user.status = editUserStatus();
    editUser(user, id);
    const sal = salary.salary;
    console.log(sal);
    if (salary.salary !== null) {
      editSalary(salary, id);
    } else {
      <p>Please Enter the Salary First</p>;
    }
    toast.success("Edit Employee", {
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
    navigate("/all");
  };

  return (
    <Container
      className="editcont"
      sx={{ boxShadow: 3, borderRadius: 1, p: 5 }}
      style={{
        paddingBottom: 3,
        paddingTop: 15,
        marginTop: 100,
        position: "relative",
        maxHeight: 500,
        maxWidth: 450,
        minWidth: 250,
        minHeight: 400,
      }}
    >
      <FormGroup>
        <Typography variant="h4">
          <center>Edit Employee</center>
        </Typography>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="name"
            value={user.name}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Email</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="email"
            value={user.email}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Address</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="address"
            value={user.address}
          />
        </FormControl>
        <Stack direction={"row"} spacing={2}>
          <FormControl>
            <InputLabel>Phone</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name="phone"
              value={user.phone}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Salary</InputLabel>
            <Input
              onChange={(e) => onValueChange1(e)}
              name="salary"
              value={salary.salary}
            />
          </FormControl>
        </Stack>
        <FormControl>
          <Stack direction={"row"}>
            <Button
              variant="contained"
              onClick={() => editUserDetails()}
              sx={{ width: 1, marginRight: 1 }}
            >
              Edit User
            </Button>
            <Button
              variant="contained"
              onClick={() => cancel()}
              sx={{ width: 1 }}
            >
              Cancel
            </Button>
          </Stack>
        </FormControl>
      </FormGroup>
    </Container>
  );
};

export default EditUser;
