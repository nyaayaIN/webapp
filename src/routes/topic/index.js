import React from 'react';
import Topic from './Topic';
import Layout from '../../components/Layout';

async function action({ fetch, params }) {
  const slug = params[0];

  const topicResponse = await fetch(`/data/topic/${slug}`, {});
  const topicData = await topicResponse.json();

  const explanationsResponse = await fetch(
    `/data/topic/${topicData.id}/explanations`,
    {},
  );
  const qnaResponse = await fetch(`/data/topic/${topicData.id}/qna`, {});

  const topicContent = {
    explanations: await explanationsResponse.json(),
    qna: await qnaResponse.json(),
  };

  const defaultExplanation = topicContent.explanations[0].slug || '';

  if (!topicData) throw new Error('Failed to load topic information');
  return {
    title: topicData.name,
    chunks: ['topic'],
    component: (
      <Layout>
        <Topic
          heroImage={topicData.image}
          name={topicData.name}
          slug={slug}
          id={topicData.id}
          summary={topicData.summary}
          explanations={topicContent.explanations}
          defaultExplanation={defaultExplanation}
          qna={topicContent.qna}
        />
      </Layout>
    ),
  };
}

export default action;
