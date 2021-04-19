import { useEffect, useState } from "react";

function Temperature(props) {
  const [location, setLocation] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [astro, setAstro] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [current, setCurrent] = useState(null);
  // const [localTime, setLocalTime] = useState(null)

  useEffect(() => {
    // console.log(props, "props");
    var year = props.date[0];
    var month = props.date[1];
    var date = props.date[2];
    const dateString = year + "-0" + month + "-" + date; // will need attention when months get into double digit - same with single digit days
    // can use location.localtime

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
        setLocation(data[0].location);
        setAstro(data[0].astronomy.astro);
        setCurrent(data[1].current);
        setForecast(data[1].forecast);
        setIsReady(true);
      });
  }, []);

  //if night - display dark mode

  //set up forecast

  //click to flip card - display info on "back"

  //change city font

  if (!isReady) {
    return null;
  }
  if (isReady) {
    // let localTime = location.localtime.split(" ");
    console.log(forecast.forecastday[0].day, astro);
    return (
      <section id="temperature">
        <section
          id="weatherInfo"
          className={`card ${
            current.condition.text === "Partly cloudy" ? "cloudy" : "sunny"
          }`}
        >
          <div className="card-body">
            <h5 className="card-title">{location.name}</h5>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div id="currentCondition" className="flip-card-front">
                  <div id="weather">
                    <div id="currentWeather">
                      <img src={current.condition.icon} />
                      <section>
                        <p>
                          {current.temp_c}&#176; <small>C / </small>
                          <small className="text-muted">
                            {forecast.forecastday[0].day.mintemp_c}&#176;C
                          </small>
                        </p>
                        <p>
                          {current.temp_f}
                          &#176; <small>F / </small>
                          <small className="text-muted">
                            {forecast.forecastday[0].day.mintemp_f}&#176;F
                          </small>
                        </p>
                        <section id="wind">
                          <small>&#127788; </small>
                          <small>{current.gust_kph} k /</small>{" "}
                          {current.gust_mph}
                          <small>m</small>
                        </section>
                      </section>
                    </div>
                    <div id="conditionYclouds">
                      <small>
                        {current.cloud > 0 && `${current.cloud}% `}
                        {current.condition.text}
                      </small>
                      <small>
                        Air Quality:{" "}
                        {current.air_quality["us-epa-index"] === 1 && `Good`}
                        {current.air_quality["us-epa-index"] === 2 &&
                          `Moderate`}
                        {current.air_quality["us-epa-index"] === 3 &&
                          `Unhealthy for sensitive group`}
                        {current.air_quality["us-epa-index"] === 4 &&
                          `Unhealthy`}
                        {current.air_quality["us-epa-index"] === 5 &&
                          `Very Unhealthy`}
                        {current.air_quality["us-epa-index"] === 6 &&
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
                <div className="flip-card-back">
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
