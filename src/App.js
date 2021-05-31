import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import DataBox from './DataBox';
import Map from './Map';
import Chart from './Chart';
import { sortData } from './util';
import './App.css';
import LineGraph from './LineGraph';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log('CCOOODDDEEE', countryCode);
    setCountry(countryCode);
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // data ka kuch kuch karne ka hai idhar
        setCountryInfo(data);
      });
  };
  // console.log('CCOUNTRRYYYYINNFFOOOOO', countryInfo);

  return (
    <div className='app'>
      <div className='app__left'>
        {/* idhar header mangta 
          ne uske sang sang 
          title aur dropdown bhi hone ka re bantai */}
        <div className='app__header'>
          <h1>COVID TRACKER</h1>
          <FormControl className='app__dropdown'>
            <Select
              varient='outline'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* idhar 3 data box mangta apun ko */}
        <div className='app__stats'>
          <DataBox
            title='Confirmed'
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <DataBox
            title='Recovered'
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <DataBox
            title='Deaths'
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/* idhar map mangta apun ko */}
        <Map />
      </div>

      <Card className='app__right'>
        <CardContent>
          {/* idhar chart mangta apun ko */}
          <h3>live cases chart</h3>
          <Chart countries={tableData} />

          {/* idhar graph mangta apun ko*/}
          <h3>new cases graph</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
