/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import CapitalWeather from "./CapitalWeather";

function Country({ country }) {
  const [weather, setWeather] = useState(null);
  const { capital } = country;

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}&aqi=no`)
      .then((res) => setWeather(res.data));
  }, [capital]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>

      <img
        style={{ margin: "20px 0" }}
        width="100px"
        src={country.flags.png}
        alt={`${country.name} flag`}
      />
      <CapitalWeather weather={weather} />
    </div>
  );
}

export default Country;
