import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Hero.css';

class Hero extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.content}>
            <h1 className={s.title}>{this.props.content.title}</h1>
            <p>{this.props.content.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Hero);
