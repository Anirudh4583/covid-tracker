import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Link,
  Container,
  Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

import GitHubIcon from '@material-ui/icons/GitHub';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

import DataBox from './DataBox';
import Map from './Map';
import Chart from './Chart';
import { formatCases, sortData } from './util';
import LineGraph from './LineGraph';
// import logo from './logo-bg.png';
import logov from './logo.mp4';

import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

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
          setMapCountries(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // data ka kuch kuch karne ka hai idhar
        // console.log('CCOOODDDEEE', countryCode);
        // console.log('lo bhai data', data);
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
        // console.log('center', mapCenter);
        // console.log('zoom', mapZoom);
      });
  };
  // console.log('CCOUNTRRYYYYINNFFOOOOO', countryInfo);

  // setTimeout(function () {
  //   document.getElementById('videoLogo').play();
  // }, 1000);

  return (
    <div className='app'>
      <AppBar className='app__nav' position='fixed' color='default'>
        <Toolbar className='app__tool'>
          {/* <img className='logo' src={logo} alt='logo' /> */}
          <video
            id='videoLogo'
            src={logov}
            height='80px'
            autoPlay={true}
            muted
          />
          <FormControl
            varient='filled'
            className='app__dropdown'
            style={{
              left: '39%',
              minWidth: '160px',
            }}
          >
            <InputLabel id='country-dropdown'>Select Country</InputLabel>
            <Select
              labelId='country-dropdown'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className='app__icons'>
            <IconButton color='inherit'>
              <Tooltip
                fontSize='large'
                title='GitHub Repo'
                leaveDelay={200}
                arrow
              >
                <Link
                  color='inherit'
                  href='https://github.com/Anirudh4583/covid-tracker'
                  target='_blank'
                >
                  <GitHubIcon fontSize='large' />
                </Link>
              </Tooltip>
            </IconButton>

            <IconButton color='inherit'>
              <Tooltip
                fontSize='large'
                title='MoHFW Gov'
                leaveDelay={200}
                arrow
              >
                <Link
                  color='inherit'
                  href='https://www.mohfw.gov.in/'
                  target='_blank'
                >
                  <LiveHelpIcon fontSize='large' />
                </Link>
              </Tooltip>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className='app__body'>
        <div className='app__left'>
          {/* idhar 3 data box mangta apun ko */}
          <div className='app__stats'>
            <DataBox
              active={casesType === 'cases'}
              onClick={(e) => setCasesType('cases')}
              title='Confirmed'
              cases={formatCases(countryInfo.todayCases)}
              total={formatCases(countryInfo.cases)}
            />
            <DataBox
              active={casesType === 'recovered'}
              onClick={(e) => setCasesType('recovered')}
              title='Recovered'
              cases={formatCases(countryInfo.todayRecovered)}
              total={formatCases(countryInfo.recovered)}
            />
            <DataBox
              active={casesType === 'deaths'}
              onClick={(e) => setCasesType('deaths')}
              title='Deaths'
              cases={formatCases(countryInfo.todayDeaths)}
              total={formatCases(countryInfo.deaths)}
            />
          </div>
          {/* idhar map mangta apun ko */}
          {/* {console.log('center', mapCenter[0])} */}
          {/* {console.log('zoom', mapZoom)} */}
          <Map
            countries={mapCountries}
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>

        <Card className='app__right' variant='outlined'>
          <CardContent>
            {/* idhar graph mangta apun ko*/}
            <h3>New Cases</h3>
            <LineGraph casesType={casesType} className='app__line' />

            {/* idhar chart mangta apun ko */}
            <hr />
            <h3>Worldwide Ranking</h3>
            <Chart countries={tableData} />
          </CardContent>
        </Card>
      </div>
      <footer className='app__footer'>
        <h4>
          Made by{' '}
          <a
            href='https://github.com/Anirudh4583/'
            target='_blank'
            rel='noreferrer'
          >
            Anirudh
          </a>
        </h4>
        <hr />
        <img
          src='https://img.icons8.com/pastel-glyph/64/000000/protection-mask--v15.png'
          alt=''
        />
      </footer>
    </div>
  );
}

export default App;
