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
  TextField,
} from "@mui/material";
import { Shadows } from "@mui/material";
import Box from "@mui/material/Box";
import "../Styles/Styles.css";
const Container = styled(FormGroup)`
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 25px;
    & > div {
      margin-top: 20px;
    }
  }
`;

const About = () => {
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Container
          className="cont"
          maxWidth="sm"
          sx={{ boxShadow: 3, borderRadius: 1, p: 5 }}
          style={{ marginTop: 100 }}
        >
          <FormGroup>
            <Typography variant="h4">
              <center>Employee Management System</center>
            </Typography>
            <Stack direction="row" spacing={15}>
              <FormControl>
                <h3>Add Employee</h3>
              </FormControl>
              <FormControl>
                <h3>Edit Employee </h3>
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={12}>
              <FormControl>
                <h3>Search Employee</h3>
              </FormControl>
              <FormControl>
                <h3>Delete Employee </h3>
              </FormControl>
            </Stack>
          </FormGroup>
        </Container>
      </Stack>
    </>
  );
};

export default About;
