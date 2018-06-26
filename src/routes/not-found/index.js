import React from 'react';
import Layout from '../../components/Layout';
import NotFound from './NotFound';

const title = "Whoops! We can't find it";

function action() {
  return {
    title: 'Page Not found!',
    description:
      'Whoops, looks like the content on this page might have moved or does not exist any more.',
    chunks: ['not-found'],
    component: (
      <Layout>
        <NotFound title={title} />
      </Layout>
    ),
    status: 404,
  };
}

export default action;
