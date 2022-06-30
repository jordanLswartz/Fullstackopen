/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from "react";

const CountrySearch = ({ filter, onFilterChange }) => (
  <form action="/">
    <label htmlFor="countries">
      <span>find countries</span>
      <input
        type="search"
        id="countries"
        value={filter}
        onChange={onFilterChange}
      />
    </label>
  </form>
);

export default CountrySearch;
