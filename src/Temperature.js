import { useEffect, useState } from "react";

function pad(str) {
  if (str < 10) {
    return "0" + str;
  }
  return str;
}

function get24Hours(str) {
  const time = str.split(" ")[0];
  const add12 = str.split(" ")[1] === "PM"; // console.log(add12) -> returns 'true'
  const hours = Number(time.split(":")[0]) + (add12 ? 12 : 0); // splits string at the ":"
  const minutes = Number(time.split(":")[1]);
  let new24HourTime = pad(hours) + ":" + pad(minutes);
  return new24HourTime;
}

function Temperature(props) {
  const { year, month, date, time } = props;
  const [location, setLocation] = useState(null);
  const [componentReady, setReady] = useState("not ready");
  const [astro, setAstro] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weather, setWeather] = useState(null);
  const [nightOrDay, setNightOrDay] = useState("night");

  useEffect(() => {
    const dateString = year + "-" + pad(month) + "-" + pad(date);

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
      .then((data) => {
        setLocation(data[1].location); // each time state is changed, the component re-renders
        setAstro(data[0].astronomy.astro);
        setWeather(data[1].current);
        setForecast(data[1].forecast);
        setReady("ready");
        const morning = new Date(
          `${dateString}T${get24Hours(data[0].astronomy.astro.sunrise)}:00`
        ).getTime();
        const evening = new Date(
          `${dateString}T${get24Hours(data[0].astronomy.astro.sunset)}:00`
        ).getTime();
        const rightNow = new Date().getTime();
        if (rightNow < morning) {
          setNightOrDay("night");
        } else if (rightNow >= morning && rightNow < evening) {
          setNightOrDay("day");
        } else {
          setNightOrDay("night");
        }
      });
  }, [year, month, date, time]); // [] runs only on mount

  if (componentReady === "not ready") {
    return null;
  }

  if (componentReady === "ready") {
    // let weatherHour = forecast.forecastday[0].hour;
    // for (let hour of weatherHour) {
    //   console.log(hour);
    // }
    // for (let i = 0; i < weatherHour; i++) {
    //   console.log(weatherHour[i], "hi");
    // }
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
                  className={`flip-card-front ${nightOrDay}`}
                >
                  <div id="weather">
                    <div id="currentWeather">
                      <img src={weather.condition.icon} />
                      <section>
                        <small>High / Low</small>
                        <p>
                          {weather.temp_c}&#176; <small>C / </small>
                          <small
                            className={
                              nightOrDay === "night" ? " " : "text-muted"
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
                              nightOrDay === "night" ? " " : "text-muted"
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

                  <div id="forecast">
                    <p>Hourly Forecast Here</p>
                  </div>
                </div>
                <div id="backSide" className={`flip-card-back ${nightOrDay}`}>
                  <div id="astronomy">
                    {astro.moon_phase === "New Moon" && (
                      <div>
                        <small>&#127761;</small>
                        <small>New Moon</small>
                      </div>
                    )}
                    {astro.moon_phase === "Waxing Crescent" && <p>&#127762;</p>}
                    {astro.moon_phase === "First Quarter" && (
                      <div>
                        <small>&#127763;</small>
                        <small>First Quarter</small>
                      </div>
                    )}
                    {astro.moon_phase === "Waxing Gibbous" && (
                      <div>
                        <small>&#127764;</small>
                        <small>Waxing Gibbous</small>
                      </div>
                    )}
                    {astro.moon_phase === "Full Moon" && (
                      <div>
                        <small>&#127765;</small>
                        <small>Full Moon</small>
                      </div>
                    )}
                    {astro.moon_phase === "Waning Gibbous" && (
                      <div>
                        <small>&#127766;</small>
                        <small>Waning Gibbous</small>
                      </div>
                    )}
                    {astro.moon_phase === "Last Quarter" && (
                      <div>
                        <small>Last Quarter</small>
                        <small>&#127767;</small>
                      </div>
                    )}
                    {astro.moon_phase === "Waning Crescent" && (
                      <div>
                        <small>&#127768;</small>
                        <small>Waning Crescent</small>
                      </div>
                    )}
                    {astro.moon_phase === "Crescent Moon" && (
                      <div>
                        <small>&#127769;</small>
                        <small>Crescent Moon</small>
                      </div>
                    )}
                    <section>
                      <div>
                        <small className="caption">SUNRISE</small>
                        <small>&#127749; {astro.sunrise}</small>
                        <small className="caption">SUNSET</small>
                        <small>&#127750; {astro.sunset}</small>
                      </div>
                      <div>
                        <small className="caption">MOONRISE</small>
                        <small>&#127773; {astro.moonrise}</small>
                        <small className="caption">MOONSET</small>
                        <small>&#127770; {astro.moonset}</small>
                      </div>
                    </section>
                  </div>
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
