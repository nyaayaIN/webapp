/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import Categories from '../Categories';
import logoUrl from './logo.png';
import logoUrl2x from './logo@2x.png';

const API = '/data/static_pages';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i18n: {},
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ i18n: data.header }));
  }

  render() {
    const { i18n } = this.state;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation
            about={i18n.about_title}
            contact={i18n.contact_title}
            blog={i18n.blog_title}
          />
          <Link className={s.brand} to="/">
            <img
              src={logoUrl}
              srcSet={`${logoUrl2x} 2x`}
              width="95"
              height="75"
              alt={i18n.logo_text}
            />
          </Link>
        </div>
        <Categories />
      </div>
    );
  }
}

export default withStyles(s)(Header);
