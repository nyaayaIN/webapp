import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Topics.css';
import Link from '../Link';

const S3 = 'https://s3.ap-south-1.amazonaws.com/staging-image-test/images/';

class Topics extends React.Component {
  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  render() {
    return (
      <div className={s.topics}>
        {this.props.collection.map(topic => (
          <Link className={s.topic} to={topic.url} key={topic.id}>
            <div className={s.tile}>
              <img
                className={s.thumbnail}
                src={S3 + topic.image}
                alt={topic.name}
              />
              <div className={s.title}>{topic.name}</div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default withStyles(s)(Topics);
