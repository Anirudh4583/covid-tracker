import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 200,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 400,
  },
  deaths: {
    hex: '#808080',
    multiplier: 800,
  },
};

// sort the countries by number of cases for ranking
export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// draw circles on the map
export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      // TODO: find a radius for circles
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className='pop-container'>
          <div
            className='pop-flag'
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className='pop-info country'>{country.country}</div>
          <div className='pop-info pop-cases'>
            - Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className='pop-info pop-recovered'>
            - Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className='pop-info pop-deaths'>
            - Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

// format the numbers
export const formatCases = (noOfCases) =>
  noOfCases ? `${numeral(noOfCases).format('0.000a')}` : '0';
