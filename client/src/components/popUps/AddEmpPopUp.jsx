import React, { useEffect } from "react";
import "./Styles/popUpStyle.css";
import { x_mark_1 } from "../../utils/icons";
import { useState } from "react";
import { addUser } from "../../service/api";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// const defaultValue = {
//   name: "",
//   email: "",
//   address: "",
//   phone: "",
//   status: "1",
//   reg_date: new Date().toISOString().split("T")[0],
// };

const AddEmp = ({ setShowAddEmp, setReloadAddEmp }) => {
  // const [user, setUser] = useState(defaultValue);
  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empAddress, setEmpAddress] = useState("");
  const [empPhone, setEmpPhone] = useState("");
  const [empStatus, setEmpStatus] = useState("1");
  const [empRegDate, setEmpRegDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [empImage, setEmpImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const onValueChange = (e) => {
  //   // setUser({ ...user, [e.target.name]: e.target.value });
  // };

  // const onValueChangeName = (e) => {

  //   // setEmpName({ ...empName, [e.target.name]: e.target.value });
  // }
  // const onValueChangeEmail = (e) => {
  //   setEmpEmail({ ...empEmail, [e.target.name]: e.target.value });
  // }
  // const onValueChangeAddress = (e) => {
  //   setEmpAddress({ ...empAddress, [e.target.name]: e.target.value });
  // }
  // const onValueChangePhone = (e) => {
  //   setEmpPhone({ ...empPhone, [e.target.name]: e.target.value });
  // }
  // const onValueChangeImage = (e) => {
  //   setEmpImage(e.target.files[0])
  //   setEmpImage({ ...empImage, [e.target.name]: e.target.value });
  // }

  const onSubmit = async () => {
    // if(e.target.files[0].size > 2000000) {
    // console.log(req.body)
    // e.preventDefault();
    const url = "http://localhost:5000/add";
    try {
      const formData = new FormData();
      formData.append("name", empName);
      formData.append("email", empEmail);
      formData.append("address", empAddress);
      formData.append("phone", empPhone);
      formData.append("status", empStatus);
      formData.append("reg_date", empRegDate);
      formData.append("image", empImage, empImage.name);
      console.log(formData);
      await axios.post(url, formData);
      setShowAddEmp((prev) => !prev);
      setReloadAddEmp((prev) => !prev);
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
      setErrorMessage(error.response.data.message);
      console.log("Error while importing Employee Data ");
    }
    // } else {
    //   setErrorMessage("Enter image Under 2 MB")
    //   console.log("Enter image under 3 MB")
    // }
  };

  const handleChange = (e) => {
    if (e.target.files[0].size > 2000000) {
      setErrorMessage("Enter image less than 2 MB");
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
    } else {
      setEmpImage(e.target.files[0]);
    }
  };

  // const addUserDetails = () => {
  //   addUser(user);
  //   setShowAddEmp((prev) => !prev);
  //   setReloadAddEmp((prev) => !prev);
  //   toast.success(" Added Employee ", {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // };

  const closepopup = () => {
    setShowAddEmp((prev) => !prev);
  };

  return (
    <>
      <div className="add-proj-div">
        <div className="ad-proj-hd-div">
          <h4 className="add-proj-title">New Employee</h4>
          <i className="close-pop-up" onClick={() => closepopup()}>
            {x_mark_1}
          </i>
        </div>
        <form className="add-proj-form">
          <div>
            <span>{errorMessage}</span>
          </div>
          <div>
            <label className="field-label">Name:</label>
            <input
              className="proj-add-field"
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={(e) => setEmpName(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label">Email:</label>
            <input
              className="proj-add-field"
              type="text"
              name="email"
              placeholder="Enter Email"
              onChange={(e) => setEmpEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label" style={{ marginRight: -5 }}>
              Address:
            </label>
            <input
              className="proj-add-field"
              type="text"
              name="address"
              placeholder="Enter Address"
              onChange={(e) => setEmpAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label">Phone:</label>
            <input
              className="proj-add-field"
              type="text"
              name="phone"
              placeholder="Enter Phone"
              onChange={(e) => setEmpPhone(e.target.value)}
            />
          </div>
          <div style={{ position: "relative" }}>
            <label className="field-label">Photo:</label>
            <input
              type="file"
              accept="image/*"
              className="user_input_1"
              id="myImage"
              name="myImage"
              onChange={(e) => handleChange(e)}
              style={empImage ? { width: 400 } : {}}
            />
            {empImage && (
              <img
                src={URL.createObjectURL(empImage)}
                alt="Emp-Image"
                style={{
                  width: "4rem",
                  height: "4rem",
                  borderRadius: "100%",
                  position: "absolute",
                  left: "27rem",
                }}
              />
            )}
          </div>
        </form>
        <button className="add-proj-form-btn" onClick={onSubmit}>
          Submit
        </button>
        {/* <button className="add-proj-form-btn" onClick={addUserDetails}>
          Submit
        </button> */}
      </div>
    </>
  );
};

export default AddEmp;
