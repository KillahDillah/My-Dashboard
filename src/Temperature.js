import { useEffect, useState } from "react";

function Temperature(props) {
  const [location, setLocation] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [astro, setAstro] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    var year = props.date[0];
    var month = props.date[1];
    var date = props.date[2];
    const dateString = year + "-0" + month + "-" + date; // will need attention when months get into double digit - same with single digit days

    // const location = "Las Vegas";
    // const weatherAPIKey = "3869c89cd91949e9972175217211504";
    // const weatherURL = "http://api.weatherapi.com/v1/current.json?key=";
    // const airQualityKey = "&aqi=yes"; //make dynamic
    // const astronomyKey = "&dt=";
    // const forecastKey = "&days=7";
    // const fullAPI = weatherURL + weatherAPIKey + "&q=" + location

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
        setAstro(data[0].astronomy.astro);
        setCurrent(data[1].current);
        setForecast(data[1].forecast);
        setLocation(data[1].location);
        setIsReady(true);
      });
  }, []);

  // write function for epa index
  //   US - EPA standard.
  // 1 means Good
  // 2 means Moderate
  // 3 means Unhealthy for sensitive group
  // 4 means Unhealthy
  // 5 means Very Unhealthy
  // 6 means Hazardous

  //if night - display dark mode

  //set up forecast

  //click to flip card - display info on "back"

  if (!isReady) {
    return null;
  }
  if (isReady) {
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
            <h6 className="card-subtitle mb-2 text-muted">{location.region}</h6>
            <div id="currentCondition">
              <div id="currentLocation">
                <img src={current.condition.icon} />
                <small>{current.condition.text}</small>
                {current.cloud > 0 && <small>Clouds: {current.cloud}%</small>}
              </div>
              <div id="astronomy">
                {astro.moon_phase === "New Moon" && <p>&#127761;</p>}
                {astro.moon_phase === "Waxing Crescent" && <p>&#127762;</p>}
                {astro.moon_phase === "First Quarter" && (
                  <small>&#127763;</small>
                )}
                {astro.moon_phase === "Waxing Gibbous" && (
                  <small>&#127764;</small>
                )}
                {astro.moon_phase === "Full Moon" && <small>&#127765;</small>}
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

            <hr />
            <section id="conversion">
              <div>
                <h5>
                  {current.temp_c}&#176; <small>C </small>
                  <small className="text-muted">/</small> {current.temp_f}
                  &#176; <small>F</small>
                </h5>
                <h6>
                  <small>&#127788;&#65039; </small>
                  {current.gust_kph} <small>k /</small> {current.gust_mph}{" "}
                  <small>m</small>
                </h6>
              </div>
              <small>Air Quality: {current.air_quality["us-epa-index"]}</small>
            </section>
          </div>
        </section>
        <div></div>
      </section>
    );
  }
}

export default Temperature;
