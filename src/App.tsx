import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Card from './components/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function App() {
  //json object that stores api fetch data
  const [nasaData, setNasaData] = React.useState([{
    copyright: '',
    date: '',
    explanation: '',
    hdurl: '',
    media_type: '',
    service_version: '',
    title: '',
    url: ''
  }]);

  const [startDate, setStartDate] = React.useState(new Date(Date.now()));
  const [endDate, setEndDate] = React.useState(new Date(Date.now()));


  //store in process.env 
  process.env['REACT_APP_NASA_API_KEY'] = 'GJeb9jLlI7sPvboK4n6Rn21TxAehRMLAkatmhdBF';
  
  const onStartDateChange = (date: Date) => {
    if (date) {
      setStartDate(date);
    }
  };

  const onEndDateChange = (date: Date) => {
    if (date) {
      setEndDate(date);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`https://api.nasa.gov/planetary/apod?api_key=GJeb9jLlI7sPvboK4n6Rn21TxAehRMLAkatmhdBF&start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`)
      .then(res => res.json())
      .then(data => {
        setNasaData(data);
      })
      .catch(err => console.log(err));
  }

    
  return (
    <div className="App" style={{backgroundColor:'#92A9BD'}}>
       <div className="container" style={{padding:50}}>
         <div className="row ">
          <h1 style={{textAlign:'center'}}>NASA Astronomy Picture of the Day</h1>
            <form className="form-inline"  onSubmit={onSubmit}>
              <div className="row">
                <div className="form-group" style={{width:200}}>
                  <label>Start Date:</label>
                  <DatePicker
                    
                    selected={startDate}
                    onChange={onStartDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="Start Date"
                    maxDate={endDate}
                  />
                </div>
                <div className="form-group" style={{width:200}}>
                  <label>End Date:</label>
                  <DatePicker

                    selected={endDate}
                    onChange={onEndDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="form-control"
                    placeholderText="End Date"
                    minDate={startDate}
                  />
                </div>
                <div className="d-flex align-items-end" style={{width:100, }}>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                  
              </div>
              
            </form>

          </div>

          {nasaData.map( (data, index) => {
             
             return (
              <div key={index} className="row" style={{marginTop:50}} >
                <div className="col-md-5">
                  {data.url && 
                  <Card
                    nasaData={data}
                  />
                  }
                </div>
            </div>
               

             )}
           )}


      </div>
   
    </div>
  );}

export default App;
