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
    credit: PropTypes.string.isRequired,
  };

  render() {
    const { about, contact, blog, credit } = this.props;
    return (
      <div className={s.root} role="navigation">
        <div className={s.primary}>
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
          <div className={s.socialLinksContainer}>
            <a
              className={s.socialLink}
              href="https://facebook.com/nyaayain/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={s.iconContainer}>
                <img src={facebook} className={s.icon} alt="Facebook icon" />
              </div>
            </a>
            <a
              className={s.socialLink}
              href="https://twitter.com/NyaayaIN"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={s.iconContainer}>
                <img src={twitter} className={s.icon} alt="Twitter icon" />
              </div>
            </a>
            <a
              className={s.socialLink}
              href="https://www.linkedin.com/company/nyaaya/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={s.iconContainer}>
                <img src={linkedin} className={s.icon} alt="LinkedIn Icon" />
              </div>
            </a>
          </div>
        </div>
        <div className={s.secondary}>
          <div className={s.credit}>{credit}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
