import React from 'react';
import Layout from '../../components/Layout';
import Contact from './Contact';

function action() {
  return {
    title: 'Contact Us',
    description:
      'You can email us at contact@nyaaya.in or find us on facebook or twitter @nyaayain',
    chunks: ['contact'],
    component: (
      <Layout>
        <Contact />
      </Layout>
    ),
  };
}

export default action;
