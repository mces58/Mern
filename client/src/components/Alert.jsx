import React from 'react';

import { Button, Alert as MuiAlert } from '@mui/material';

function Alert() {
  return (
    <>
      <MuiAlert severity="warning" elevation={6} variant="filled">
        This is an error alert — check it out!
      </MuiAlert>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </>
  );
}

export default Alert;
