import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Questions.css';
import Link from '../Link';

class Questions extends React.Component {
  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  render() {
    return (
      <ul className={s.questions}>
        {this.props.collection.map((item, index) => (
          <li className={s.question} key={index}>
            <Link to={item.url} className={s.questionLink}>
              <p className={s.questionText}>{item.question}</p>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default withStyles(s)(Questions);
