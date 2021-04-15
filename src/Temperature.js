import { useEffect, useState } from "react";

function Temperature() {
  const [data, setData] = useState(null);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
      const location = "Las Vegas";
      const weatherAPIKey = "3869c89cd91949e9972175217211504";
      const weatherURL = "http://api.weatherapi.com/v1/current.json?key=";
      const fullAPI = weatherURL + weatherAPIKey + "&q=" + location + "&aqi=yes";
    fetch(fullAPI)
      .then(res => res.json())
      .then(data => setData(data))
      .then(isReady => setIsReady(true))
  },[])  

  console.log(data);
  if (!isReady) {
    return (
      null
    )
  } 

  return (
    <>
    <p>{data.location.name}</p>
    <p>{data.location.region}</p>
    <p>{data.current.condition.text}</p>
    </>
  )

}

export default Temperature;
