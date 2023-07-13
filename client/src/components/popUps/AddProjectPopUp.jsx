import React from 'react';
import "./Styles/popUpStyle.css";
import { x_mark_1 } from '../../utils/icons';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { addProject } from '../../service/projectApi';
import { toast, ToastContainer } from "react-toastify";
const defaultValue = {
    projTitle: "",
    projDesc: "",
    timeStamp: "",
    status: "0",
    start_date: new Date().toISOString().split("T")[0],
}

const AddProject = ({setShowAddProj}) => {
    const [project, setProject] = useState(defaultValue);
    const onValueChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
      };
    const addProjectDetails = () => {
        addProject(project);
        toast.success(" Added Project ", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowAddProj(prev => !prev)
      };
    const closepopup = () => {
        setShowAddProj(prev => !prev)
    }
    return (
       <>
            <div className='add-proj-div'>
                <div className='ad-proj-hd-div'>
                    <h4 className='add-proj-title'>New Project</h4><i className='close-pop-up' onClick={() => closepopup()}>{x_mark_1}</i>
                </div>
                <form className='add-proj-form'>
                    <input className='proj-add-field' type='text' name='projTitle' title='projTitle' placeholder='Enter Project Title' onChange={(e) => onValueChange(e)}/>
                    <input className='proj-add-field' type='text' name='timeStamp' title='timeStamp' placeholder='Enter Time Stamp' onChange={(e) => onValueChange(e)}/>
                    <textarea className='proj-add-field-1' type='' name='projDesc' title='projDesc' placeholder='Project Desc' onChange={(e) => onValueChange(e)}/>
                </form>
                <button className='add-proj-form-btn' onClick={() => addProjectDetails()}>Submit</button>
            </div>
       </>
    )
}

export default AddProject;