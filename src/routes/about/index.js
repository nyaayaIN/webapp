import React from 'react';
import Layout from '../../components/Layout';
import About from './About';

function action() {
  return {
    title: 'About Us',
    description:
      'Nyaaya provides comprehensive information on various legal topics, covering most aspects of the law that people interact with in their daily lives.',
    chunks: ['about'],
    component: (
      <Layout>
        <About />
      </Layout>
    ),
  };
}

export default action;
