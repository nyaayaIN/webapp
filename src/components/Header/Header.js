import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Categories from '../Categories';

import logoUrl from './logo.svg';
import emailLogoUrl from './email.svg';
import facebookLogoUrl from './facebook-logo-button.svg';
import instagramLogoUrl from './instagram-logo.svg';
import whatsappLogoUrl from './whatsapp.svg';
import twitterLogoUrl from './twitter-logo-button.svg';

const API = '/data/localization/header';

function updateLanguage(e) {
  if (e.target.innerHTML === 'English') {
    document.cookie = 'hindi_nyaaya=; Max-Age=0';
    window.location.reload();
  } else {
    document.cookie =
      'hindi_nyaaya=true; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    window.location.reload();
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      about: 'About Us',
      contact: 'Contact Us',
      blog: 'Blog',
      logo: 'Nyaaya',
      view: 'View Categories',
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
          view: data.view_categories,
        });
      });
  }

  render() {
    const { about, blog, contact, logo, view } = this.state;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.topMenu}>
            <div className={s.secondaryLinks}>
              <div className={s.languageSelector}>
                <button className={s.language} onClick={updateLanguage}>
                  English
                </button>
                &nbsp;|&nbsp;
                <button className={s.language} onClick={updateLanguage}>
                  हिन्दी
                </button>
              </div>
              <Link className={s.secondaryLink} to="/about">
                {about}
              </Link>
              <a
                className={s.secondaryLink}
                href="https://medium.com/nyaaya"
                target="_blank"
                rel="noopener noreferrer"
              >
                {blog}
              </a>
              <Link className={s.secondaryLink} to="/contact">
                {contact}
              </Link>
            </div>

            <Link className={s.brand} to="/">
              <img src={logoUrl} alt={logo} />
            </Link>

            <div className={s.contactUs}>
              <Link className={s.contactIcon} to="mailto:contact@nyaaya.in">
                <img src={emailLogoUrl} alt="Email Us" />
              </Link>
              <Link className={s.contactIcon} to="https://wa.me/919650108107">
                <img src={whatsappLogoUrl} alt="WhatsApp" />
              </Link>
              <Link className={s.contactIcon} to="https://twitter.com/NyaayaIN">
                <img src={twitterLogoUrl} alt="Twitter" />
              </Link>
              <Link
                className={s.contactIcon}
                to="https://facebook.com/nyaayain/"
              >
                <img src={facebookLogoUrl} alt="Facebook" />
              </Link>
              <Link
                className={s.contactIcon}
                to="https://www.instagram.com/nyaaya/"
              >
                <img src={instagramLogoUrl} alt="Instagram" />
              </Link>
            </div>
          </div>
        </div>
        <Categories view={view} />
      </div>
    );
  }
}

export default withStyles(s)(Header);
