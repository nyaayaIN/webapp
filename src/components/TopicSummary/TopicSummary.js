import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './TopicSummary.css';

class TopicSummary extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.content}>
            <h1 className={s.name}>{this.props.name}</h1>
            <div
              className={s.summary}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: this.props.summary }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(TopicSummary);
