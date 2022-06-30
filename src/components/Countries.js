/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from "react";

function Countries({ countries, showInfo }) {
  return (
    <div style={{ margin: "20px 0" }}>
      {countries.length >= 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <div>
          {countries.map((country) => (
            <div key={country.alpha3Code}>
              {country.name.common}{" "}
              <button onClick={() => showInfo(country.name.common)}>
                Show
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Countries;
