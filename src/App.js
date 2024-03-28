import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([])
  const fetchCountry = async () => {
    try {
      let response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
      setFilteredCountries(response.data);
    }
    catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchCountry();

  }, [])

  const handleChange = (e) => {
    let search = e.target.value.toLowerCase();
    setSearchTerm(search);
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(search)
    )
    setFilteredCountries(filtered);

  }

  return (
    <div >
      <input className="input-country" placeholder="Search for the countries" value={searchTerm} type="text" onChange={handleChange} />
      <div className="container">
        {filteredCountries.map((country) => (<div className="countryCard"><img className="imgStyle" src={country.flags.png} alt={country.name.common} />
          <p>{country.name.common}</p></div>))}

      </div>
    </div>
  );
}

export default App;
