import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    half_op: 'rgba(204, 16, 52, 0.5)',
    label: 'New Active Cases',
  },
  recovered: {
    hex: '#7dd71d',
    half_op: 'rgba(125, 215, 29, 0.5)',
    label: 'New Recovered Cases',
  },
  deaths: {
    hex: '#808080',
    half_op: 'rgba(128,128,128, 0.5)',
    label: 'New Deaths',
  },
};

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 2.2,
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

const buildChartData = (data, casesType) => {
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

function LineGraph({ casesType, className }) {
  const [data, setData] = useState([]);

  // https://disease.sh/v3/covid-19/historical/all?lastdays=30
  // lastdays = value of no. of days

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((res) => res.json())
        .then((data) => {
          // kuch kuch karna hai data ka
          // console.log(data);
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div className={className}>
      {/* run only if data isnt empty my boi */}
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: casesTypeColors[casesType].label,
                backgroundColor: casesTypeColors[casesType].half_op,
                borderColor: casesTypeColors[casesType].hex,
                data: data,
                fill: true,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
