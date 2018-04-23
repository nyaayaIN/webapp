import React from 'react';
import Layout from '../../components/Layout';
import About from './About';

function action() {
  return {
    chunks: ['about'],
    component: (
      <Layout>
        <About />
      </Layout>
    ),
  };
}

export default action;
