import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

import facebook from './facebook.svg';
import twitter from './twitter.svg';
import linkedin from './linkedin.svg';

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
        <a className={s.socialLink} href="https://facebook.com/nyaayain/" target="_blank" rel="noopener noreferrer">
          <div className={s.iconContainer}>
            <img src={facebook} className={s.icon}/>
          </div>
        </a>
        <a className={s.socialLink} href="https://twitter.com/NyaayaIN" target="_blank" rel="noopener noreferrer">
          <div className={s.iconContainer}>
            <img src={twitter} className={s.icon}/>
          </div>
        </a>
        <a className={s.socialLink} href="https://www.linkedin.com/company/nyaaya/" target="_blank" rel="noopener noreferrer">
          <div className={s.iconContainer}>
            <img src={linkedin} className={s.icon}/>
          </div>
        </a>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
