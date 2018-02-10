import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Topic.css';

import Hero from '../../components/Hero';
import Explanations from '../../components/Explanations';
import Glossary from '../../components/Glossary';
import QnA from '../../components/QnA';

const S3 = 'https://s3.ap-south-1.amazonaws.com/staging-image-test/images/';

class Topic extends React.Component {
  static propTypes = {
    hero: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    explanations: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ).isRequired,
    qna: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
      }),
    ).isRequired,
    glossary: PropTypes.arrayOf(
      PropTypes.shape({
        term: PropTypes.string.isRequired,
        definition: PropTypes.string.isRequired,
      }),
    ).isRequired,
    chosen: PropTypes.shape({
      explanation: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    const summary = {
      title: this.props.name,
      description: this.props.summary
    };
    return (
      <div className={s.root}>
        <Hero content={summary} style="bottom" image={S3+this.props.hero} theme="dark"/>
        <Explanations
          collection={this.props.explanations}
          chosen={this.props.chosen.explanation}
        />
        
        <QnA collection={this.props.qna} />

        <Glossary
          collection={this.props.glossary}
        />
      </div>
    );
  }
}

export default withStyles(s)(Topic);
