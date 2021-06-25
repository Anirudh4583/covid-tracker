import React from 'react';
import './Chart.css';

function Chart({ countries }) {
  return (
    <div className='chart'>
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Chart;
