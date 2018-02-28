import React from 'react';
import Topic from './Topic';
import Layout from '../../components/Layout';

async function action({ fetch, params, query }) {
  const topicResponse = await fetch(`/data/topic/${params[0]}`, {});
  const topicData = await topicResponse.json();

  if (!topicData) throw new Error('Failed to load topic information');

  const chosen = {
    explanation: parseInt(query.explanation, 10) || 0,
  };
  return {
    title: topicData.name,
    chunks: ['topic'],
    component: (
      <Layout>
        <Topic
          hero={topicData.image}
          name={topicData.name}
          summary={topicData.summary}
          chosen={chosen}
        />
      </Layout>
    ),
  };
}

export default action;
