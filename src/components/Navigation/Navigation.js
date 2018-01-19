/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

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
        <Link className={s.link} to="/about-us">
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
