import React from 'react';
import Topic from './Topic';
import Layout from '../../components/Layout';

async function action({ fetch, params }) {
  const topicSlug = params[0];
  const topicResponse = await fetch(`/data/topic/${topicSlug}`, {});
  const topicData = await topicResponse.json();
  if (!topicData) throw new Error('Failed to load topic information');
  return {
    title: topicData.name,
    description: topicData.summary,
    imageUrl: topicData.image,
    chunks: ['topic'],
    component: (
      <Layout>
        <Topic
          slug={topicSlug}
          heroImage={topicData.image}
          name={topicData.name}
          id={topicData.id}
          summary={topicData.summary}
          sources={topicData.sources}
        />
      </Layout>
    ),
  };
}

export default action;
