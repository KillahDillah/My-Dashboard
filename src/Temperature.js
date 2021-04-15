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
    const fullAPI = weatherURL + weatherAPIKey + "&q=" + location + "&aqi=yes";
    fetch(fullAPI)
      .then(res => res.json())
      .then(data => setData(data))
      .then(isReady => setIsReady(true))
  },[])  

  // useEffect(() => {
  //   fetch("http://api.weatherapi.com/v1/astronomy.json?key=3869c89cd91949e9972175217211504&q=Las Vegas&dt=2021-04-15")
  //     .then(res => res.json())
  //     .then(astro => console.log(astro))
  // }, [])

  console.log(data);
  if (!isReady) {
    return (
      null
    )
  } 


  if (isReady) {
    return (
    <main>
      <section id="weatherInfo">
        <p>{data.location.name}, {data.location.region}</p>
        <div>
          <p>{data.current.condition.text}</p>
          <img src={data.current.condition.icon} />
        </div>
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
      <p>{data.current.cloud}</p>
    </main>
    )
  }

}

export default Temperature;
