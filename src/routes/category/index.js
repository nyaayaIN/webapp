import React from 'react';
import Layout from '../../components/Layout';
import Category from './Category';

function properCase(string) {
  return string.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

function action(params) {
  const slug = params.pathname.substring(10, params.pathname.length);
  const categoryName = properCase(slug.replace(/-/g, ' '));
  return {
    title: categoryName,
    chunks: ['category'],
    categoryName,
    slug,
    component: (
      <Layout>
        <Category categoryName={categoryName} slug={slug} />
      </Layout>
    ),
  };
}

export default action;
