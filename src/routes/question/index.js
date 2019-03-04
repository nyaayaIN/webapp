import React from 'react';
import Question from './Question';
import Layout from '../../components/Layout';

async function action({ fetch, params }) {
  const questionSlug = params[0].split('/')[0];
  const questionResponse = await fetch(`/data/question/${questionSlug}`, {});
  const questionData = await questionResponse.json();
  if (!questionData) throw new Error('Failed to load question and answer');
  return {
    title: questionData.question,
    description: questionData.answer,
    chunks: ['question'],
    component: (
      <Layout>
        <Question
          slug={questionData.slug}
          question={questionData.question}
          answer={questionData.answer}
        />
      </Layout>
    ),
  };
}

export default action;
