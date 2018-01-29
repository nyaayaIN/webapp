import React from 'react';
import Category from './Category';
import Layout from '../../components/Layout';

async function action({ fetch, params }) {
  const resp = await fetch(`/data/category/${params[0]}`, {});
  const data = await resp.json();
  if (!data) throw new Error('Failed to load category information');
  return {
    title: data.name,
    chunks: ['category'],
    component: (
      <Layout>
        <Category
          name={data.name}
          description={data.description}
          topics={data.topics}
        />
      </Layout>
    ),
  };
}

export default action;
