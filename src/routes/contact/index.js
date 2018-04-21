import React from 'react';
import Layout from '../../components/Layout';
import Contact from './Contact';

function action() {
  return {
    chunks: ['contact'],
    component: (
      <Layout>
        <Contact />
      </Layout>
    ),
  };
}

export default action;
