import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Topic.css';

class Topic extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.topicName}>{this.props.name}</h1>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Topic);
