import React, { useEffect, useLayoutEffect, useState } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card, CardContent
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import {sortData} from "./util";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]); {/* Empty array */}
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
    
    {/* STATE = how to write variable in react */}
    {/* USEEFFECT = runs a piece of code based on given condition */}

    useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
    }, []);

    useEffect(() => {
      const getCountriesData = async () => {
        fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ( //map loopa skozi array, map vrača array
            { //zgoraj grem čez vse države v API-ju
              //določim kaj funkcija vrača
              name: country.country,
              value: country.countryInfo.iso2,          
            }));
            
            const sortedData = sortData(data);
            setTableData(sortedData);  //table data za tabelo primerov po vseh državah
            setCountries(countries); //nastavim države
        });
      };
  
      getCountriesData(); //gettam države(funkcija zgoraj)
    }, []);

    const onCountryChange = async (event) => {  //na klik
      const countryCode = event.target.value;
      //console.log(countryCode);
      setCountry(countryCode);

      const url = countryCode === "Worldwide" ? "https://disease.sh/v3/covid-19/all" : 
      `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]

      await fetch(url) 
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
      })
    };

    console.log(countryInfo);

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}> 
              {/* Doda default value Worldwide -> določen zgoraj izven return statementa */}
              {/* Loop through all the countries -> show them in a dropdown8 */}
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        {/* Header */}
        {/* Title + Select input dropdown */}
  
        {/* InfoBoxes */}
        <div className="app_stats">
          <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases}/> {/* podatke najdem v inspectu JSON fila ki ga vrne console log */}
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>


        {/* Table */}
        {/* Graph */}
        
        
        {/* Map */}
        <Map/>
      </div>

      <Card className="app_right">
        <CardContent>
          {/* table */}
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />
          {/* graph */}
          <h3>WorldWide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
