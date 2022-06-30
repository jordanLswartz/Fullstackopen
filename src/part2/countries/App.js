/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "../../components/Country";
import Countries from "../../components/Countries";
import CountrySearch from "../../components/CountrySearch";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState("null");

  const countriesToDisplay =
    filter &&
    countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const showInfo = (countryName) => {
    setFilter(countryName);
  };

  return (
    <div className="App">
      <CountrySearch filter={filter} onFilterChange={handleFilterChange} />

      {!countriesToDisplay ? null : countriesToDisplay.length === 1 ? (
        <Country country={countriesToDisplay[0]} />
      ) : (
        <Countries showInfo={showInfo} countries={countriesToDisplay || []} />
      )}
    </div>
  );
}

export default App;
