import React from "react";
import axios from "axios";
import { useState } from "react";
import "../../Styles/Styles.css";
import { x_mark_1 } from "../../utils/icons";
import { toast } from "react-toastify";
const ImportCsvPopUp = ({ setShowImport }) => {
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
      setShowImport(prev => !prev)
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
  const closepopup = ({ setShowImport }) => {
    setShowImport((prev) => !prev);
  };
  return (
    <>
      <div className="add-proj-div">
        <div className="ad-proj-hd-div">
            <div className="uplt">
          <h4 className="add-proj-title">Import Employees CSV</h4>
          <i className="close-pop-up" onClick={() => closepopup()}>
            {x_mark_1}
          </i>
        </div>
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
        </form>
        </div>
        <button className="edit-proj-form-btn" type="submit">
          Save
        </button>
      </div>
    </>
  );
};

export default ImportCsvPopUp;
