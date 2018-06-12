import React from 'react';
import Category from './Category';
import Layout from '../../components/Layout';

async function action({ fetch, params }) {
  const categoryResponse = await fetch(`/data/category/${params[0]}`, {});
  const categoryData = await categoryResponse.json();
  if (!categoryData) throw new Error('Failed to load category information');

  return {
    title: categoryData.name,
    description: categoryData.summary,
    chunks: ['category'],
    component: (
      <Layout>
        <Category
          name={categoryData.name}
          description={categoryData.description}
          topics={categoryData.topics}
        />
      </Layout>
    ),
  };
}

export default action;
