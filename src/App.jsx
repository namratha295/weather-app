import { useState } from "react";

const api={
  key:"c3fa1b6c70027a820c77b56fb23ec0e4",
  base:"https://api.openweathermap.org/data/2.5/"
}
const dateBuilder=(d)=>{
 let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

 let day=days[d.getDay()]
 let date=d.getDate()
 let month=months[d.getMonth()]
 let year=d.getFullYear()

 return `${day},${date} ${month} ${year}`
}
function App() {
  const [query,setQuery]=useState('')
  const [weather,setWeather]=useState({})
  const search=e=>{
    if(e.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&APPID=${api.key}&units=metric`)
      .then(res=>res.json())
      .then(result=>{setWeather(result); setQuery(''); console.log(result);})
    }
  }
  return (
    <div className={(typeof weather.main !="undefined")?((weather.main.temp > 20)?'app warm':'app'):'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" 
            placeholder="Search..."  onChange={e => setQuery(e.target.value)}
            value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined")?(
          <div>
            <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°c </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
          </div>
        ):('')}
      </main>
      
    </div>
  );
}

export default App;
