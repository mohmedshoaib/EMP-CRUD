import axios from 'axios';

const URL = 'http://localhost:5000'; 
const URL_add = 'http://localhost:5000/add'
const URL_get = 'http://localhost:5000/all'
const URL_getSal = 'http://localhost:5000/all/salary' 
const URL_sal = 'http://localhost:5000/salary'
const URL_editSal = 'http://localhost:5000/sal/edit'
const URL_editSta = 'http://localhost:5000/all/editstatus'
const URL_saldel = 'http://localhost:5000/sal/del'


export const addUser = async (result) => {
    try {
        const {data} = await axios.post(URL_add, result)
        console.log(data)
    }
    catch (error) {
        console.log('Error while calling add User Api', error)
    }
}

export const getUsers = async () => {
    try {
        return await axios.get(URL_get)
    }
    catch (error) {
        console.log("Error while calling getUsers API ", error)
    }
}

export const getUser = async (id) => {
    try {
        return await axios.get(`${URL}/${id}`)
    }
    catch (error) {
        console.log("Error while calling getUser API", error)
    }
}

export const editUser = async (user, id)  => {
    try {
        return await axios.put(`${URL}/${id}`, user)
    }
    catch (error) {
        console.log("Error while calling editUser API", error)
    }
}

export const deleteUser = async (id) => {
    try {
        return await axios.delete(`${URL}/${id}`)
    }
    catch (error) {
        console.log("Error while calling deleteuser API", error)
    }
}

export const addSalary = async (salary) => {
    try {
        const {data} = await axios.post(`${URL_sal}`, salary)
        console.log(data)
    }
    catch (error) {
        console.log("Error while calling addSalary", error)
    }
}

export const delSalary = async (id) => {
    try {
        return await axios.delete(`${URL_saldel}/${id}`)
    } catch (error) {
        console.log("Error while calling DeleteSalary API", error)
    }
}

export const getSalaries = async () => {
    try {
        return await axios.get(URL_getSal)
    }
    catch (error) {
        console.log("Error While calling getSalaries API", error)
    }
}

export const editSalary = async (salary, id) => {
    try {
        return await axios.put(`${URL_editSal}/${id}`, salary)
    }
    catch (error) {
        console.log("Error while calling editSalary API", error)
    }
}

export const editStatus = async (id) => {
    try {
        return await axios.put(`${URL_editSta}/${id}`)
    }
    catch (error) {
        console.log("Error While calling editStatus API", error)
    }
}
