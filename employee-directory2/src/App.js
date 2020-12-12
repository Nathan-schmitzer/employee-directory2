import './App.css';
import React, { useState, useEffect } from "react";
import API from "./utils/API";
import Navbar from "./components/Navbar/navbar";
import Card from "./components/Card/index";

function App() {
  const [employeeInfo, setEmployeeInfo] = useState([]);
  
  useEffect( () => {
    API.getEmployees()
    .then(res => {
      setEmployeeInfo(res.data.results)
    } ) 
    .catch(err => console.log(err));
  }, []);
  console.log(employeeInfo)
  
  return (
    <div className="App">
      <Navbar />
        <br />
        <div>
        {employeeInfo.map(info =>
          <Card employee={info} key={info.id.value} />
        )}
      </div>
     
    </div>
  );
}

export default App;
{/* <div className="list-group-item" key={data.id.value}>
                <img src={data.picture.thumbnail} alt="Person"/>
                  <p>
                    {`${data.name.first} ${data.name.last}`} 
                  </p> 
                  <p>
                    {`${data.email}`}
                  </p>
              </div> */}