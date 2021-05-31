import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltip: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltilItem, data) {
        return numeral(tooltilItem.value).format('+0,0');
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltilFormat: 'll',
        },
      },
    ],
    yAxes: [
      {
        gridlines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

function LineGraph({ casesType = 'cases' }) {
  const [data, setData] = useState([]);

  const buildChartData = (data, casesType = 'cases') => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  // https://disease.sh/v3/covid-19/historical/all?lastdays=30
  // lastdays = value of no. of days

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((res) => res.json())
        .then((data) => {
          // kuch kuch karna hai data ka
          console.log(data);
          const chartData = buildChartData(data);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div>
      {/* run only if data isnt empty my boi */}
      <Line
        data={{
          datasets: [
            {
              backgroundColor: 'rgba(204, 16, 52, 0.5)',
              borderColor: '#CC1034',
              data: data,
            },
          ],
        }}
        // options={options}
      />
    </div>
  );
}

export default LineGraph;
