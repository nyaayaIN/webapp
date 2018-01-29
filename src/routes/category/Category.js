import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../components/Link';
import s from './Category.css';

class Category extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.categoryName}>{this.props.name}</h1>
          <p>{this.props.description}</p>
        </div>
        <div className={s.categoryTopics}>
          <div className={s.container}>
            {this.props.topics.map(topic => (
              <div className={s.topic}>
                <Link className={s.topicLink} to={topic.url}>
                  {topic.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Category);
