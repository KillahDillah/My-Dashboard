// import Temperature from "./Temperature";
// import WaterIntake from "./WaterIntake";
import "./App.scss";
import "./styles.scss";
import { useEffect, useState } from "react";

var date = new Date();

function App() {
  const [nightOrDay, setNightOrDay] = useState("night"); // don't use boolean values for state change
  const [updatedDate, setDate] = useState(null);
  const [todaysDay, setTodaysDay] = useState(null);
  const [todaysDate, setTodaysDate] = useState(null);
  const [thisMonth, setThisMonth] = useState(null);
  const [thisMonthNum, setThisMonthNum] = useState(null);
  const [fullYear, setFullYear] = useState(null);
  const [todaysTime, setTodaysTime] = useState(null);
  // const [newTime, setNewTime] = useState(null);

  useEffect(() => {
    function getTodaysTime(time) {
      let minutes = time.getMinutes();
      let hours = time.getHours();

      if (minutes < 10) {
        return hours + ":0" + minutes;
      } else {
        return hours + ":" + minutes;
      }
    }

    var weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var month = [
      // array literal notation opposed to new Array(...,...,...)
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
      "December",
    ];

    setTodaysDay(weekday[date.getDay()]);
    setThisMonth(month[date.getMonth()]);
    setThisMonthNum(date.getMonth() + 1);
    setTodaysDate(date.getDate());
    setFullYear(date.getFullYear());
    setTodaysTime(getTodaysTime(date));

    const timeCheck = setInterval(() => {
      // state change here
      const d = new Date();
      console.log(d, d.getMinutes(), date);
      if (d.getMinutes() > date.getMinutes()) {
        console.log("new time");
      }
      console.log("timeCheck");
    }, 1000 * 25);

    return () => {
      clearInterval(timeCheck);
    };
  });

  // console.log(
  //   nightOrDay,
  //   "nightOrDay",
  //   todaysDay,
  //   "todaysDay",
  //   todaysDate,
  //   "todaysDate",
  //   thisMonth,
  //   "thisMonth",
  //   thisMonthNum,
  //   "thisMonthNum",
  //   fullYear,
  //   "fullYear",
  //   todaysTime,
  //   "todaysTime"
  // );
  return (
    <div className="App">
      <h1>
        Date: {thisMonth} {todaysDate}, {fullYear}
      </h1>
      <h2>Day: {todaysDay}</h2>
      <p>{todaysTime}</p>
      <main></main>
    </div>
  );
}

export default App;
// <Temperature
//   date={todaysDate}
//   year={fullYear}
//   month={thisMonthNum}
//   time={todaysTime}
//   nightOrDay={nightOrDay}
// />
// <WaterIntake />
