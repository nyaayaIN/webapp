import React from 'react';
import Layout from '../../components/Layout';
import Feedback from './Feedback';

function action() {
  return {
    title: 'Feedback',
    description:
      'Let our team know what we are doing well, what we could be doing better or what you feel is missing',
    chunks: ['feedback'],
    component: (
      <Layout>
        <Feedback />
      </Layout>
    ),
  };
}

export default action;
