import React from "react";
import "./Styles/popUpStyle.css";
import { x_mark_1 } from "../../utils/icons";
import { useState, useEffect } from "react";
import { addSalary } from '../../service/api';
import { toast, ToastContainer } from "react-toastify";

const defaultValue = {
  user_id: "",
  salary: "",
};

const AddSal = ({ setShowAddSal, salId, setReloadAddSal }) => {
  const [salary, setSalary] = useState("");

  const onValueChange = (e) => {
    console.log(e.target.value)
    setSalary(e.target.value);
  };

  const addSalDetails = () => {
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
    if (salary === "") {
      console.log("hello")
        const salaryDetails = {
          user_id: salId,
          salary: 0,
        };
        console.log(salaryDetails)
        addSalary(salaryDetails)
        .then(setShowAddSal(prev => !prev))
        .then(setReloadAddSal(prev => !prev))
        .catch((error) => {
            console.log("Error adding salary details:", error);
        });
    } 
    else {
      console.log("hii")
        const salaryDetails = {
          user_id: salId,
          salary: salary,
        };
        addSalary(salaryDetails)
        .then(setShowAddSal(prev => !prev))
        .then(setReloadAddSal(prev => !prev))
        .catch((error) => {
            console.log("Error adding salary details:", error);
        });
      }
  }

  const closepopup = () => {
    setShowAddSal(prev => !prev);
  };
  return (
    <>
      <div className="add-proj-div">
        <div className="ad-proj-hd-div">
          <h4 className="add-proj-title">Add Salary</h4>
          <i className="close-pop-up" onClick={() => closepopup()}>
            {x_mark_1}
          </i>
        </div>
        <form className="add-proj-form">
          <input
            className="proj-add-field"
            type="text"
            name="projTitle"
            title="projTitle"
            placeholder="Enter Salary"
            onChange={(e) => onValueChange(e)}
          />
        </form>
        <button className="add-proj-form-btn" onClick={addSalDetails}>
          Submit
        </button>
      </div>
    </>
  );
};

export default AddSal;
