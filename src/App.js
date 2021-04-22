import Temperature from "./Temperature";
// import WaterIntake from "./WaterIntake";
import "./App.scss";
import "./styles.scss";
import { useEffect, useState } from "react";

var date = new Date();

function App() {
  // const [nightOrDay, setNightOrDay] = useState("night"); // don't use boolean values for state change
  const [todaysDay, setTodaysDay] = useState(null);
  const [todaysDate, setTodaysDate] = useState(null);
  const [thisMonth, setThisMonth] = useState(null);
  const [thisMonthNum, setThisMonthNum] = useState(null);
  const [fullYear, setFullYear] = useState(null);
  const [todaysTime, setTodaysTime] = useState(null);

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
      if (d.getMinutes() !== date.getMinutes()) {
        setTodaysTime(getTodaysTime(d));
      }
    }, 1000);

    return () => {
      clearInterval(timeCheck);
    };
  }, []);

  return (
    <div className="App">
      <h1>
        Date: {thisMonth} {todaysDate}, {fullYear}
      </h1>
      <h2>Day: {todaysDay}</h2>
      <p>{todaysTime}</p>
      <main>
        <Temperature
          date={todaysDate}
          year={fullYear}
          month={thisMonthNum}
          time={todaysTime}
          day={date.getDate()}
        />
      </main>
    </div>
  );
}

export default App;

// <WaterIntake />
