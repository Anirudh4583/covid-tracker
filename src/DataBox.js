import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

function DataBox({ title, cases, total }) {
  return (
    <Card className='dataBox'>
      <CardContent>
        <Typography color='textSecondary'>{title}</Typography>
        <Typography className='databox__cases'>+{cases}</Typography>
        <h2 className='databox__total'>{total}</h2>
      </CardContent>
    </Card>
  );
}

export default DataBox;
