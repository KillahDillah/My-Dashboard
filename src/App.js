import Temperature from "./Temperature";
import WaterIntake from "./WaterIntake";
import "./App.scss";
import "./styles.scss";
import { useEffect, useState } from "react";

// const Time = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setTimeout(() => setTime(new Date()), 1000);
//     return () => clearTimeout(timer);
//   });

//   return <h1>{time.toLocaleTimeString()}</h1>;
// };

function App() {
  var date = new Date();
  var weekday = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  var todaysDay = weekday[date.getDay()];

  var month = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );
  var todaysMonth = month[date.getMonth()];
  var todaysMonthNum = date.getMonth() + 1;
  var todaysDate = date.getDate();
  var fullYear = date.getFullYear();
  var todaysTime;

  function getTodaysTime(time) {
    let minutes = time.getMinutes();
    let hours = time.getHours();

    if (minutes < 10) {
      todaysTime = hours + ":0" + minutes;
    } else {
      todaysTime = hours + ":" + minutes;
    }
  }
  getTodaysTime(date);

  return (
    <div className="App">
      <h1>
        Date: {todaysMonth}, {todaysDate}
      </h1>
      <h2>Day: {todaysDay}</h2>
      <p>{todaysTime}</p>
      <main>
        <Temperature
          date={todaysDate}
          year={fullYear}
          month={todaysMonthNum}
          time={todaysTime}
        />
        <WaterIntake />
      </main>
    </div>
  );
}

export default App;
