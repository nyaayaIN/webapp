import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Explanation.css';

class Explanation extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.explanation}>
        <h2 className={s.title}>{this.props.title}</h2>
        <div
          className={s.content}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />
      </div>
    );
  }
}

export default withStyles(s)(Explanation);
