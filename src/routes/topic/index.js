import React from 'react';
import Layout from '../../components/Layout';
import Topic from './Topic';

function properCase(string) {
  return string.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

function action(params) {
  const slug = params.pathname.substring(7, params.pathname.length);
  const topicName = properCase(slug.replace(/-/g, ' '));
  return {
    title: topicName,
    chunks: ['topic'],
    topicName,
    slug,
    component: (
      <Layout>
        <Topic topicName={topicName} slug={slug} />
      </Layout>
    ),
  };
}

export default action;
