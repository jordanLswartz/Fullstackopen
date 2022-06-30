/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from "react";

const CapitalWeather = ({ weather }) => {
  console.log(weather);
  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p>
        <b>Temperature:</b> {weather.current.temp_c} Celsius
        <sup>&deg;</sup>
      </p>
      <img
        style={{ margin: "20px 0" }}
        width="100px"
        src={weather.current.condition.icon}
        alt={''}
      />
    </div>
  );
};

export default CapitalWeather;
