import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {
  static propTypes = {
    about: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    blog: PropTypes.string.isRequired,
  };

  render() {
    const { about, contact, blog } = this.props;
    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/about">
          {about}
        </Link>
        <Link className={s.link} to="/contact">
          {contact}
        </Link>
        <a
          className={s.link}
          href="https://medium.com/nyaaya"
          target="_blank"
          rel="noopener noreferrer"
        >
          {blog}
        </a>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
