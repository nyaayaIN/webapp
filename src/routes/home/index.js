import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action() {
  return {
    chunks: ['home'],
    title: 'Nyaaya',
    component: (
      <Layout>
        <Home />
      </Layout>
    ),
  };
}

export default action;
