import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Explanations.css';

import Explanation from '../Explanation';

class Explanations extends React.Component {
  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.current}>
          {this.props.collection.map(explanation => (
            <Explanation
              title={explanation.title}
              content={explanation.content}
            />
          ))}
        </div>
        <ul className={s.menu}>
          {this.props.collection.map(explanation => (
            <li className={s.item}>{explanation.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(s)(Explanations);
