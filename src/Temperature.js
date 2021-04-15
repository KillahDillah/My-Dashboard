import {useEffect} from 'react';


function Temperature() {
  const location = "Las Vegas";
  const weatherAPIKey = "3869c89cd91949e9972175217211504";
  const weatherURL = "http://api.weatherapi.com/v1/current.json?key=";
  const fullAPI = weatherURL + weatherAPIKey + "&q=" + location + "&aqi=yes";

  useEffect(() => {
    fetch(fullAPI)
      .then(response => response.json())
      .then(data => console.log(data))
  })  

  return <p> temperature</p>;
  //
}

export default Temperature;
