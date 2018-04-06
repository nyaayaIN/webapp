import React from 'react';
import Category from './Category';
import Layout from '../../components/Layout';

async function action({ fetch, params }) {
  const categoryResponse = await fetch(`/data/category/${params[0]}`, {});
  const categoryData = await categoryResponse.json();
  if (!categoryData) throw new Error('Failed to load category information');

  const topicsResponse = await fetch(
    `/data/category/${categoryData.id}/topics`,
    {},
  );
  const topicsData = await topicsResponse.json();
  if (!topicsData) throw new Error('Failed to load topics for category');

  return {
    title: categoryData.name,
    chunks: ['category'],
    component: (
      <Layout>
        <Category
          name={categoryData.name}
          description={categoryData.description}
          topics={topicsData}
        />
      </Layout>
    ),
  };
}

export default action;
