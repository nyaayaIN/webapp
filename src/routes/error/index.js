import React from 'react';
import ErrorPage from './ErrorPage';

function action() {
  return {
    title: 'Error!',
    description:
      'Whoops, looks like something went wrong when trying to display this page.',
    component: <ErrorPage />,
  };
}

export default action;
