import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import Categories from '../Categories';
import logoUrl from './logo.png';
import logoUrl2x from './logo@2x.png';

const API = '/data/static_pages/header';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      about: 'About Us',
      contact: 'Contact Us',
      blog: 'Blog',
      logo: 'Nyaaya',
      view: 'View Categories'
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.setState({
          about: data.about_title,
          contact: data.contact_title,
          blog: data.blog_title,
          logo: data.logo_text,
          view: data.view_categories
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
        <Categories view={this.state.view}/>
      </div>
    );
  }
}

export default withStyles(s)(Header);
