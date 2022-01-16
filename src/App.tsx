import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Card from './components/Card';

var DatePicker = require("react-bootstrap-date-picker");


function App() {
  //json object that stores api fetch data
  const [nasaData, setNasaData] = React.useState({
    copyright: '',
    date: '',
    explanation: '',
    hdurl: '',
    media_type: '',
    service_version: '',
    title: '',
    url: ''
  });

  const [date, setDate] = React.useState(new Date());

  const handleChangeDate = (date: Date) => {
    setDate(date);
  }


  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=GJeb9jLlI7sPvboK4n6Rn21TxAehRMLAkatmhdBF&start_date=' + '2017-07-08' +'&end_date=' + '2017-07-10')
      .then(res => res.json())
      .then(data => {
        setNasaData(data); 
      });
  }, [])
    
  return (
    <div className="App" style={{backgroundColor:'#92A9BD'}}>
       <div className="container" style={{padding:50}}>
        <div className="row">
          <div className="col-md-12">
            <DatePicker id="example-datepicker" value={date} onChange={handleChangeDate} />
          </div>
        </div>
        <div className="row" >
          <div className="col-md-5">
            <Card nasaData={nasaData} ></Card>
            </div>
          </div>

      </div>
   
    </div>
  );}

export default App;
