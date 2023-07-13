import React from 'react';
import "./Styles/popUpStyle.css";
import { x_mark_1 } from '../../utils/icons';
import { useState, useEffect } from 'react';
import { getProject, editProject } from '../../service/projectApi';
import { toast, ToastContainer } from "react-toastify";

const defaultValue = {
    projTitle: "",
    timeStamp: "",
    status: "",
    projDesc: "",
}

const EditProject = ({setShowEditProj, setReloadProj, projId}) => {
    const [project, setProject] = useState(defaultValue);
    useEffect(() => {
        const fetchdata = async () => {
           await loadProjectDetails();
        };
        fetchdata();
    }, []);

    const editProjValue = (e) => {
        console.log(e.target.value)
        setProject({ ...project, [e.target.name] : e.target.value});
    }

    const closepopup = () => {
        setShowEditProj(prev => !prev);
    }
    
    const loadProjectDetails = async () => {
        const response = await getProject(projId);
        setProject(response.data);
    }

    const editProjectDetails = () => {
        editProject(project, projId);
        setShowEditProj(prev => !prev);
        setReloadProj(prev => !prev);
        toast.success("Edit details Successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    }
    
    return (
       <>
            <div className='add-proj-div'>
                <div className='ad-proj-hd-div'>
                    <h4 className='add-proj-title'>Edit Project</h4><i className='close-pop-up' onClick={() => closepopup()}>{x_mark_1}</i>
                </div>
                <form className='add-proj-form'>
                    <input className='proj-add-field' type='text' name='projTitle' placeholder='Project Title' value={project.projTitle} onChange={(e) => editProjValue(e)}/>
                    <input className='proj-add-field' type='text' name='timeStamp' placeholder='Time Stamp' value={project.timeStamp} onChange={(e) => editProjValue(e)}/>
                    <input className='proj-add-field' type='text' name='status' placeholder='Status' value={project.status} onChange={(e) => editProjValue(e)}/>
                    <textarea className='proj-add-field-1' name='projDesc' value={project.projDesc} placeholder='Project Desc' onChange={(e) => editProjValue(e)}/>
                </form>
                <button className='edit-proj-form-btn' type='submit' onClick={editProjectDetails}>Save</button>
            </div>
       </>
    )
}

export default EditProject;