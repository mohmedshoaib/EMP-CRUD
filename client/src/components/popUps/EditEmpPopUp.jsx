import React from "react";
import "./Styles/popUpStyle.css";
import { x_mark_1 } from "../../utils/icons";
import { useState, useEffect } from "react";
import { editUser, editSalary, getUser } from "../../service/api";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
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

const EditEmp = ({ setShowEditEmp, setReloadEmp, editId }) => {
  // console.log(editId)
  const [user, setUser] = useState(defaultValue);
  const [salary, setSalary] = useState(defaultValue1);
  const [editedImage, setEditedImage] = useState("");
  const [editImageError, setEditImageError] = useState("");
  const onValueChange = (e) => {
    // console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onValueChange1 = (e) => {
    setSalary({ ...salary, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fecthData2 = async () => {
      await loadUserDetails();
    };
    fecthData2();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const URL_T = `http://localhost:5000/sal/${editId}`;
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
    const response = await getUser(editId);
    setUser(response.data);
  };

  const editUserDetails = () => {
    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("address", user.address);
      formData.append("phone", user.phone);
      editedImage && formData.append("image", editedImage, editedImage.name);
      console.log(formData);
      editUser(formData, editId);
      // editUser(user, editId);
      setShowEditEmp((prev) => !prev);
      setReloadEmp((prev) => !prev);
      const sal = salary.salary;
      console.log(sal);
      if (salary.salary !== null) {
        editSalary(salary, editId);
      } else {
        <p>Please Enter the Salary First</p>;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0].size > 2000000) {
      setEditImageError("Enter image less than 2 MB");
    } else {
      setEditedImage(e.target.files[0]);
    }
  };

  const closepopup = () => {
    setShowEditEmp((prev) => !prev);
  };

  return (
    <>
      <div className="add-proj-div">
        <div className="ad-proj-hd-div">
          <h4 className="add-proj-title">Edit Employee</h4>
          <i className="close-pop-up" onClick={() => closepopup()}>
            {x_mark_1}
          </i>
        </div>
        <form className="add-proj-form">
          <div>
            <label className="field-label">Name:</label>
            <input
              className="proj-add-field"
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div>
            <label className="field-label">Email:</label>
            <input
              className="proj-add-field"
              type="text"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => onValueChange(e)}
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
              placeholder="Address"
              value={user.address}
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div>
            <label className="field-label">Phone:</label>
            <input
              className="proj-add-field"
              type="text"
              name="phone"
              placeholder="Phone"
              value={user.phone}
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div>
            <label className="field-label">Salary:</label>
            <input
              className="proj-add-field"
              type="text"
              name="salary"
              placeholder="Salary"
              value={salary.salary}
              onChange={(e) => onValueChange1(e)}
            />
          </div>

          <div className="file-input-wrapper-2">
            <label className="field-label">Salary:</label>
            <input
              className="user_input_2"
              type="file"
              accept=".jpg, .png, .jpeg"
              id="myImage"
              name="image"
              onChange={(e) => handleChange(e)}
            />
            {!editedImage && user.image && (
              <img
                src={user.image}
                alt="Emp-Image"
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  borderRadius: "100%",
                  position: "absolute",
                  left: "31rem",
                }}
              />
            )}
            {editedImage && (
              <img
                src={URL.createObjectURL(editedImage)}
                alt="Emp-Image"
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  borderRadius: "100%",
                  position: "absolute",
                  left: "31rem",
                }}
              />
            )}
          </div>
        </form>
        <button
          className="edit-proj-form-btn"
          type="submit"
          onClick={editUserDetails}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default EditEmp;
