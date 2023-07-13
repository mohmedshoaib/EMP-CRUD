import axios from 'axios';

const URL_add = 'http://localhost:5000/add/newproject';
const URL_all = 'http://localhost:5000/all/projects';
const URL_get = 'http://localhost:5000/one/project';
const URL_edit = 'http://localhost:5000/edit/project';

export const addProject = async (result) => {
    try {
        const {data} = await axios.post(URL_add, result);
        console.log(data)
    } catch (error) {
        console.log('Error while calling add Project Api', error)
    }
};

export const getProjects = async () => {
    try {
        return await axios.get(URL_all);
    } catch (error) {
        console.log("Error while calling getProjects API", error)
    }
};

export const getProject = async (id) => {
    try {
        return await axios.get(`${URL_get}/${id}`)
    } catch (error) {
        console.log("Error While calling getProject API", error)
    }
};

export const editProject = async (project, id) => {
    try {
        await axios.put(`${URL_edit}/${id}`, project)
    } catch (error) {
        console.log("Error While calling editProject API" , error);
    }
};