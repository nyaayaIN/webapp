import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Topics.css';
import Link from '../Link';

const CLOUDINARY = `https://res.cloudinary.com/nyaaya-testing/image/upload/w_500,h_319,c_fill/`;

class Topics extends React.Component {
  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  render() {
    return (
      <div className={s.topics}>
        {this.props.collection
          .filter(topic => topic.name.length > 0 && topic.summary.length > 0)
          .map(topic => (
            <Link className={s.topic} to={topic.url} key={topic.id}>
              <div className={s.tile}>
                <div className={s.thumbnail}>
                  <img
                    src={`${CLOUDINARY + topic.image}.jpg`}
                    alt={topic.name}
                  />
                </div>
                <div>
                  <div className={s.title}>{topic.name}</div>
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: topic.summary,
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
      </div>
    );
  }
}

export default withStyles(s)(Topics);
