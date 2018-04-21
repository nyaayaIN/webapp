import React from 'react';
import Layout from '../../components/Layout';
import NotFound from './NotFound';

const title = "Whoops! We can't find it";

function action() {
  return {
    chunks: ['not-found'],
    title,
    component: (
      <Layout>
        <NotFound title={title} />
      </Layout>
    ),
    status: 404,
  };
}

export default action;
