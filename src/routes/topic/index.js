import React from 'react';
import Topic from './Topic';
import Layout from '../../components/Layout';

async function action({ fetch, params }) {
  const resp = await fetch(`/data/topic/${params[0]}`, {});
  const data = await resp.json();
  if (!data) throw new Error('Failed to load topic information');
  return {
    title: data.name,
    chunks: ['topic'],
    component: (
      <Layout>
        <Topic
          name={data.name}
          description={data.description}
          topics={data.topics}
        />
      </Layout>
    ),
  };
}

export default action;