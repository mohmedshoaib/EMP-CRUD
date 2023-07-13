import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components Files
import AddUser from './components/AddUser';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import AllUser from './components/AllUser';
import About from './components/About';
import EditUser from './components/EditUser';
import AddSalary from './components/AddSalary';
import AllProject from './components/AllProject';
import AllEmp from './components/AllEmp';
import 'react-toastify/dist/ReactToastify.css';
// import SearchUser from './components/Search';

function App() {
  return (
    <>
    <div className='app-cont'>
    <BrowserRouter>
      <SideBar />
      {/* <NavBar/> */}
        {/* <Routes>
          <Route path='/' element={<About/>} />
          <Route path='/add' element={<AddUser/>} />
          <Route path='/all' element={<AllUser/>} />
          <Route path='/edit/:id' element={<EditUser/>} />
          <Route path='/salary/:id' element={<AddSalary/>} />
          <Route path='/search' element={<SearchUser/>} />
          <Route path='/all-projects' element={<AllProject />} />
          <Route path='/all-emp' element={<AllEmp />} /> 
        </Routes> */}
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;