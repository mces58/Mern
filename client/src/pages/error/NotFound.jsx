import React from 'react';
import { useRouteError } from 'react-router-dom';

function NotFound() {
  const error = useRouteError();
  console.log(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText}</i>
        <br />
        <i>{error.status}</i>
        <br />
        <i>{error.error.message}</i>
      </p>
    </div>
  );
}

export default NotFound;
