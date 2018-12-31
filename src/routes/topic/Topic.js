import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Topic.css';

import Explanations from '../../components/Explanations';
import Glossary from '../../components/Glossary';
import Sources from '../../components/Sources';
import QnA from '../../components/QnA';

class Topic extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
    explanation: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.title}>
          <div className={s.topicTitle}>{this.props.name}</div>
        </div>
        <div className={s.contentWrapper}>
          <Explanations
            slug={this.props.slug}
            title={this.props.name}
            id={this.props.id}
            chosen={this.props.explanation}
          />
          <Glossary id={this.props.id} />
        </div>
        <QnA id={this.props.id} />
        <Sources content={this.props.sources} />
      </div>
    );
  }
}

export default withStyles(s)(Topic);
