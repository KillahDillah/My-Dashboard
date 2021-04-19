import Temperature from "./Temperature";
import WaterIntake from "./WaterIntake";
import "./App.scss";
import "./styles.scss";

function App() {
  var date = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var todaysDay = weekday[date.getDay()];
  console.log(date, "date");

  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var todaysMonth = month[date.getMonth()];
  var todaysMonthNum = date.getMonth() + 1;
  var todaysDate = date.getDate();
  var fullYear = date.getFullYear();

  return (
    <div className="App">
      <h1>
        Date: {todaysMonth}, {todaysDate} background depicting month
      </h1>
      <h2>Day: {todaysDay}</h2>
      <main>
        <Temperature date={[fullYear, todaysMonthNum, todaysDate]} />
        <WaterIntake />
      </main>
    </div>
  );
}

export default App;
