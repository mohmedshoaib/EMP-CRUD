import React from "react";
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
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addSalary } from "../service/api";
import { toast } from "react-toastify";
import AllUser from "./AllUser";
import "../Styles/style.css";

const Container = styled(FormGroup)`
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 40px;
    & > div {
      margin-top: 20px;
    }
  }
`;

// const currentDate = new Date()
const defaultValue = {
  user_id: "",
  salary: "",
};

// Main Function
const AddSalary = () => {
  // console.log(setSalId)
  const [salary, setSalary] = useState(defaultValue);
  const { id } = useParams();
  // console.log(id);
  const onValueChange = (e) => {
    setSalary({ ...salary, [e.target.name]: e.target.value });
    // console.log(salary)
  };

  const navigate = useNavigate();

  const addSalaryDetails = () => {
    toast.info("Added Salary", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    if (salary.salary === "") {
      const salaryDetails = {
        user_id: id,
        salary: 0,
      };
      addSalary(salaryDetails)
        .then(() => navigate("/all"))
        .catch((error) => {
          console.log("Error adding salary details:", error);
        });
    } else {
      const salaryDetails = {
        user_id: id,
        salary: salary.salary,
      };
      addSalary(salaryDetails)
        .then(() => navigate("/all"))
        .catch((error) => {
          console.log("Error adding salary details:", error);
        });
    }
  };

  const cancel = () => {
    toast.warn("Salary not Added", {
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
    <Container
      className="addsalcont"
      sx={{ boxShadow: 3, borderRadius: 1, p: 5 }}
      style={{ paddingBottom: 5, paddingTop: 10, marginTop: 140 }}
    >
      <FormGroup>
        <Typography variant="h4">
          <center>Add Salary</center>
        </Typography>
        <FormControl>
          <InputLabel>Salary</InputLabel>
          <Input
            type="number"
            name="salary"
            onChange={(e) => onValueChange(e)}
          />
        </FormControl>
        <FormControl>
          <Stack direction={"row"}>
            <Button
              variant="contained"
              onClick={addSalaryDetails}
              sx={{ width: 1, marginRight: 1 }}
            >
              Add Salary
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

export default AddSalary;
