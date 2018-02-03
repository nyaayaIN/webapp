import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Topics.css';
import Link from '../Link';

class Topics extends React.Component {
  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  render() {
    return (
      <div className={s.topics}>
        {this.props.collection.map((topic, index) => (
          <Link className={s.topic} to={topic.url} key={index}>
            <div className={s.tile}>
              <div className={s.title}>{topic.name}</div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default withStyles(s)(Topics);
