import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './DataBox.css';

function DataBox({ title, cases, total, ...props }) {
  // console.log(props.onClick);
  return (
    <Card
      className={`databox ${title} ${props.active ? 'databox--active' : ''}`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography color='textPrimary' align='center'>
          {title}
        </Typography>
        <Typography color='textSecondary' id='databox__cases' align='center'>
          +{cases}
        </Typography>
        <Typography
          color='textPrimary'
          className='databox__total'
          variant='h5'
          align='center'
        >
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DataBox;
