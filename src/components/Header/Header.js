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
      about: 'About Us',
      contact: 'Contact Us',
      blog: 'Blog',
      logo: 'Nyaaya',
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.setState({
          about: data.header.about_title,
          contact: data.header.contact_title,
          blog: data.header.blog_title,
          logo: data.header.logo_text,
        });
      });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Navigation
            about={this.state.about}
            contact={this.state.contact}
            blog={this.state.blog}
          />
          <Link className={s.brand} to="/">
            <img
              src={logoUrl}
              srcSet={`${logoUrl2x} 2x`}
              width="95"
              height="75"
              alt={this.state.logo}
            />
          </Link>
        </div>
        <Categories />
      </div>
    );
  }
}

export default withStyles(s)(Header);
