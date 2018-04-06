import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const api = await fetch(`/data/static_pages/home`, {});
  const i18n = await api.json();
  if (!i18n) throw new Error('Failed to load homepage static text');

  const featuredTopicsCall = await fetch(`/data/topics/featured`, {});
  const featuredTopics = await featuredTopicsCall.json();
  if (!featuredTopics)
    throw new Error('Failed to load Featured Content on Homepage');

  const hero = {
    title: i18n.hero_title,
    description: i18n.hero_description,
  };

  const headings = {
    featured_topics: i18n.featured_topics,
    what_we_do: i18n.what_we_do,
    short_explanation: i18n.short_explanation,
    short_disclaimer: i18n.short_disclaimer,
  };

  return {
    title: i18n.page_title,
    chunks: ['home'],
    component: (
      <Layout>
        <Home hero={hero} headings={headings} featured={featuredTopics} />
      </Layout>
    ),
  };
}

export default action;
