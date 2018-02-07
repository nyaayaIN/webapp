import React from 'react';
import Topic from './Topic';
import Layout from '../../components/Layout';

async function action({ fetch, params, query }) {
  const resp = await fetch(`/data/topic/${params[0]}`, {});
  const data = await resp.json();
  if (!data) throw new Error('Failed to load topic information');
  const chosen = {
    explanation: parseInt(query.explanation, 10) || 0,
  };
  return {
    title: data.name,
    chunks: ['topic'],
    component: (
      <Layout>
        <Topic
          hero={params[0]+"-full.jpg"}
          name={data.name}
          summary={data.summary}
          explanations={data.explanations}
          qna={data.qna}
          glossary={data.glossary}
          chosen={chosen}
        />
      </Layout>
    ),
  };
}

export default action;
