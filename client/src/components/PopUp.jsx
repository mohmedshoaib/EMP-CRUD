import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../Styles/Styles.css";
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
import { toast } from "react-toastify";
const Container = styled(FormGroup)`
  left: -75px;
  width: 60rem;
  height: 100vh;
  padding: 0;
  margin: 0;
  background-color: rgb(0, 0, 0, 0.2);
  & > div {
    margin-top: 40px;
    & > div {
      margin-top: 20px;
    }
  }
`;


const PopUp = ({setShow}) => { 
  const cancel = () => {
    setShow(prev => !prev)
    toast.warn("File not imported", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
//   const movey = () => {
//     toast.success("Imported SuccessFully", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       setShow(prev => !prev)
//   }
  const [fileData, setFileData] = useState("");
  const handleChange = async (e) => {
    console.log("HIII")
    e.preventDefault();
    const url = "http://localhost:5000/importUser/data";
    console.log("HIII")
    try {
      const formData = new FormData();
      formData.append("myFile", fileData, fileData.name);
      await axios.post(url, formData);
      setShow(prev => !prev)
      toast.success("Imported SuccessFully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log("Error while importing Excel file ");
    }
  };
  return (
    <>
      {/* <Container
        className="cont"
        sx={{ boxShadow: 5, borderRadius: 1, p: 5 }}
        style={{ position: "absolute", top: 0, left: 0 }}
      > */}
        <div className='add-proj-div'>
        <div className="uplt">
            <div className="uplthead"><center>Import CSV File</center></div>
          <form
            encType="multipart/form-data"
            method="post"
            onSubmit={handleChange}
          >
            <div className="file-input-wrapper">
              <input
                type="file"
                accept=".csv"
                className="user_input"
                id="myFile"
                name="myFile"
                onChange={(e) => setFileData(e.target.files[0])}
              />
            </div>
            <FormControl>
          <Stack direction={"row"}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: 1, marginLeft: 33, marginTop: 5 }}
            >
              Import
            </Button>
            <Button
              variant="contained"
              onClick={() => cancel()}
              sx={{ width: 1, marginLeft:1, marginTop: 5 }}
            >
              Cancel
            </Button>
          </Stack>
        </FormControl>
          </form>
        </div>
        </div>
      {/* </Container> */}
    </>
  );
};

export default PopUp;
