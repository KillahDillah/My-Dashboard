import { useEffect, useState } from "react";

function get24Hours(str) {
  const time = str.split(" ")[0];
  const add12 = str.split(" ")[1] === "PM"; // console.log(add12) -> returns 'true'
  const hours = Number(time.split(":")[0]) + (add12 ? 12 : 0); // splits string at the ":"
  const minutes = Number(time.split(":")[1]);
  let new24HourTime = hours + ":" + minutes;
  return new24HourTime;
}

function Temperature(props) {
  const { time, year, month, date } = props;
  const [location, setLocation] = useState(null);
  const [componentReady, setReady] = useState("not ready");
  const [astro, setAstro] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weather, setWeather] = useState(null);
  const [nightOrDay, setNightOrDay] = useState("night");

  console.log(time);

  useEffect(() => {
    // useEffect happens after render
    const dateString = year + "-0" + month + "-" + date; // will need attention when months get into double digit - same with single digit days
    console.log(dateString, "first");
    Promise.all([
      fetch(
        "http://api.weatherapi.com/v1/astronomy.json?key=3869c89cd91949e9972175217211504&q=Las Vegas&dt=" +
          dateString
      ),
      fetch(
        "http://api.weatherapi.com/v1/forecast.json?key=3869c89cd91949e9972175217211504&q=Las Vegas&days=7&aqi=yes&alerts=no"
      ),
    ])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then((data) => [
        setLocation(data[1].location), // each time state is changed, the component re-renders
        setAstro(data[0].astronomy.astro),
        setWeather(data[1].current),
        setForecast(data[1].forecast),
        setReady("ready"),
      ]);
  }, []); // [] runs only on mount

  if (componentReady === "not ready") {
    return null;
  }

  if (componentReady === "ready") {
    // get24Hours(astro.sunset);
    console.log("inside Temp");
    return (
      <section id="temperature">
        <section
          id="weatherInfo"
          className={`card ${
            weather.condition.text === "Partly cloudy" ? "cloudy" : "sunny"
          }`}
        >
          <div className="card-body">
            <h5 className="card-title">{location.name}</h5>

            <div className="flip-card">
              <div className="flip-card-inner">
                <div
                  id="currentCondition"
                  className={`flip-card-front ${props.nightOrDay}`}
                >
                  <div id="weather">
                    <div id="currentWeather">
                      <img src={weather.condition.icon} />
                      <section>
                        <p>
                          {weather.temp_c}&#176; <small>C / </small>
                          <small
                            className={
                              props.nightOrDay === "night" ? " " : "text-muted"
                            }
                          >
                            {forecast.forecastday[0].day.mintemp_c}&#176;C
                          </small>
                        </p>
                        <p>
                          {weather.temp_f}
                          &#176; <small>F / </small>
                          <small
                            className={
                              props.nightOrDay === "night" ? " " : "text-muted"
                            }
                          >
                            {forecast.forecastday[0].day.mintemp_f}&#176;F
                          </small>
                        </p>
                        <section id="wind">
                          <small>&#127788; </small>
                          <small>{weather.gust_kph} k /</small>{" "}
                          {weather.gust_mph}
                          <small>m</small>
                        </section>
                      </section>
                    </div>
                    <div id="conditionYclouds">
                      <small>
                        {weather.cloud > 0 && `${weather.cloud}% `}
                        {weather.condition.text}
                      </small>
                      <small>
                        Air Quality:{" "}
                        {weather.air_quality["us-epa-index"] === 1 && `Good`}
                        {weather.air_quality["us-epa-index"] === 2 &&
                          `Moderate`}
                        {weather.air_quality["us-epa-index"] === 3 &&
                          `Unhealthy for sensitive group`}
                        {weather.air_quality["us-epa-index"] === 4 &&
                          `Unhealthy`}
                        {weather.air_quality["us-epa-index"] === 5 &&
                          `Very Unhealthy`}
                        {weather.air_quality["us-epa-index"] === 6 &&
                          `Hazardous`}
                      </small>
                    </div>
                  </div>
                  <hr />
                  <div id="astronomy">
                    {astro.moon_phase === "New Moon" && <p>&#127761;</p>}
                    {astro.moon_phase === "Waxing Crescent" && <p>&#127762;</p>}
                    {astro.moon_phase === "First Quarter" && (
                      <div>
                        <small>&#127763;</small>
                        <small>First Quarter</small>
                      </div>
                    )}
                    {astro.moon_phase === "Waxing Gibbous" && (
                      <small>&#127764;</small>
                    )}
                    {astro.moon_phase === "Full Moon" && (
                      <small>&#127765;</small>
                    )}
                    {astro.moon_phase === "Waning Gibbous" && (
                      <small>&#127766;</small>
                    )}
                    {astro.moon_phase === "Last Quarter" && (
                      <small>&#127767;</small>
                    )}
                    {astro.moon_phase === "Waning Crescent" && (
                      <small>&#127768;</small>
                    )}
                    {astro.moon_phase === "Crescent Moon" && (
                      <small>&#127769;</small>
                    )}
                    <section>
                      <div>
                        <small>&#127749; {astro.sunrise}</small>
                        <small>&#127750; {astro.sunset}</small>
                      </div>
                      <div>
                        <small>&#127773; {astro.moonrise}</small>
                        <small>&#127770; {astro.moonset}</small>
                      </div>
                    </section>
                  </div>
                </div>
                <div className={`flip-card-back ${props.nightOrDay}`}>
                  <p>hello</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div></div>
      </section>
    );
  }
}

export default Temperature;
