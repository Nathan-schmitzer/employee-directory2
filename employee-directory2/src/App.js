import './App.css';
import React, { useState, useEffect } from "react";
import API from "./utils/API";
import Navbar from "./components/Navbar/navbar";
import Card from "./components/Card/index";
import { sortUsers } from "./utils/sortUsers";


function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeArr, setEmployeeArr] = useState([]);
  const [firstNameAscOrder, setFirstNameAscOrder] = useState(true);
  const [lastNameAscOrder, setLastNameAscOrder] = useState(true);

  useEffect( () => {
    API.getEmployees()
    .then(res => {
      setEmployeeData(res.data.results);
      setEmployeeArr(res.data.results);
    } ) 
    .catch(err => console.log(err));
  }, []);
  console.log(employeeData)

  function filterUsers(e) {
    const filterByFirst = employeeArr.filter((a) => a.name.first.toLowerCase().startsWith(e.target.value.toLowerCase()));
    setEmployeeData(filterByFirst);
  }

  function filterUsersLast(e) {
    const filteredByLast = employeeArr.filter((a) => a.name.last.toLowerCase().startsWith(e.target.value.toLowerCase()));
    setEmployeeData(filteredByLast);
  }
  
  return (
    <div className="App">
      <Navbar />
        <br />
        <div className="buttons">
        <button className="button" onClick={() => sortUsers(employeeData, setEmployeeData, firstNameAscOrder, setFirstNameAscOrder, "first")}>Sort first name A-Z</button>

        <button className="button" onClick={() => sortUsers(employeeData, setEmployeeData, lastNameAscOrder, setLastNameAscOrder, "last")}>Sort last name A-Z</button>

        <input className="button" type="text" placeholder="Search user by first name" onChange={filterUsers} />

        <input className="button" type="text" placeholder="Search user by last name" onChange={filterUsersLast} />
        </div>
        
        <div>
        {employeeData.map(info =>
          <Card employee={info} key={info.id.value} />
        )}
      </div>
     
    </div>
  );
}

export default App;
