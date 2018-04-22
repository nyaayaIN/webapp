import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Topic.css';

import Hero from '../../components/Hero';
import Explanations from '../../components/Explanations';
import Glossary from '../../components/Glossary';
import QnA from '../../components/QnA';

const CLOUDINARY = `https://res.cloudinary.com/nyaaya-testing/image/upload/`;

class Topic extends React.Component {
  static propTypes = {
    heroImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    explanations: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      }),
    ).isRequired,
    defaultExplanation: PropTypes.string.isRequired,
    qna: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  render() {
    const heroContent = {
      title: this.props.name,
      description: this.props.summary,
    };
    return (
      <div className={s.root}>
        <Hero
          content={heroContent}
          type="bottom"
          image={`${CLOUDINARY + this.props.heroImage}.jpg`}
          theme="dark"
        />
        <div className={s.topMenu}>
          <div className={s.container}>
            <button
              className={s.menuItem}
              data-scroll="explanations"
              onClick={this.handleClick}
            >
              Explanations
            </button>
            <button
              className={s.menuItem}
              data-scroll="qna"
              onClick={this.handleClick}
            >
              Questions
            </button>
            <button
              className={s.menuItem}
              data-scroll="glossary"
              onClick={this.handleClick}
            >
              Glossary
            </button>
          </div>
        </div>
        <Explanations
          topicSlug={this.props.slug}
          topicTitle={this.props.name}
          collection={this.props.explanations}
          defaultExplanation={this.props.defaultExplanation}
        />
        <QnA collection={this.props.qna} />
        <Glossary id={this.props.id} />
      </div>
    );
  }
}

export default withStyles(s)(Topic);
