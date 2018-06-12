import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const api = await fetch(`/data/localization/home`, {});
  const i18n = await api.json();
  if (!i18n) throw new Error('Failed to load homepage static text');

  return {
    title: i18n.page_title,
    chunks: ['home'],
    component: (
      <Layout>
        <Home content={i18n} />
      </Layout>
    ),
  };
}

export default action;
