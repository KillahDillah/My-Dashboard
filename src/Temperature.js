import { useEffect, useState } from "react";

function Temperature(props) {
  const [data, setData] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [astro, setAstro] = useState(null);

  useEffect(() => {
    var year = props.date[0];
    var month = props.date[1];
    var date = props.date[2];
    const dateString = year + "-0" + month + "-" + date;

    const location = "Las Vegas";
    const weatherAPIKey = "3869c89cd91949e9972175217211504";
    const weatherURL = "http://api.weatherapi.com/v1/current.json?key=";
    const fullAPI = weatherURL + weatherAPIKey + "&q=" + location + "&aqi=yes&dt=2021-04-15";
    // fetch(fullAPI)
    //   .then(res => res.json())
    //   .then(data => setData(data))
    //   .then(isReady => setIsReady(true))
    Promise.all([
      fetch("http://api.weatherapi.com/v1/astronomy.json?key=3869c89cd91949e9972175217211504&q=Las Vegas&dt=" + dateString),
      fetch(fullAPI)
    ]).then(function (responses) {
      return Promise.all(responses.map(function (response) {
		    return response.json();
      }));
    }).then((data) => {
      console.log(data[0].astronomy, data[1]);
      setAstro(data[0].astronomy.astro);
      setData(data[1]);
      setIsReady(true);
    })
  },[])  

  
  if (!isReady) {
    return (
      null
    )
  } 


  if (isReady) {
    console.log(astro)
    return (
    <main>
      <section id="weatherInfo">
        <p>{data.location.name}, {data.location.region}</p>
        <div>
          <p>{data.current.condition.text}</p>
          <img src={data.current.condition.icon} />
        </div>
        <p>Carbon Monoxide: {data.current.air_quality.co}</p>
        <p>Air Quality: {data.current.air_quality.["us-epa-index"]}</p>
      </section>
      <section id="conversion">
        <div id="celsius">
          <p>Celsius: {data.current.temp_c}</p>
          <p>Wind: {data.current.gust_kph} kph</p>
        </div>
        <div id="fahrenheit">
          <p>Farhenheit: {data.current.temp_f}</p>
          <p>Wind: {data.current.gust_mph} mph</p>
        </div>
      </section>
      <p>Clouds: {data.current.cloud}%</p>
      <section id="astronomy">
        <p>Sunrise: {astro.sunrise}</p>
        <p>Sunset: {astro.sunset}</p>
        <p>Moonrise: {astro.moonrise}</p>
        <p>Moonset: {astro.moonset}</p>
      </section>
    </main>
    )
  }

}

export default Temperature;
