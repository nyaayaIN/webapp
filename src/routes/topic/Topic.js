import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Topic.css';

import TopicSummary from '../../components/TopicSummary';
import Explanations from '../../components/Explanations';
import QnA from '../../components/QnA';

class Topic extends React.Component {
  static propTypes = {
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
    chosen: PropTypes.shape({
      explanation: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <TopicSummary name={this.props.name} summary={this.props.summary} />
        <div className={s.container}>
          <Explanations
            collection={this.props.explanations}
            chosen={this.props.chosen.explanation}
          />
          <QnA collection={this.props.qna} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Topic);
