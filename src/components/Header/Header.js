import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Categories from '../Categories';

import logoUrl from './logo.svg';

const API = '/data/localization/header';

function changeToHindi() {
  document.cookie =
    'hindi_nyaaya=true;Path=/;expires=Fri, 31 Dec 9999 23:59:59 GMT';
  window.location.reload();
}
function changeToEnglish() {
  document.cookie = 'hindi_nyaaya=false;Path=/;Max-Age=0';
  document.cookie = 'hindi_nyaaya=false;Path=/topic;Max-Age=0';
  window.location.reload();
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: 'Nyaaya',
      view: 'View Categories',
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.setState({
          logo: data.logo_text,
          view: data.view_categories,
          hindi: document.cookie.split('hindi_nyaaya')[1] !== undefined,
        });
      });
  }

  render() {
    const { logo, view, hindi } = this.state;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.mainMenu}>
            <div className={s.logo}>
              <a href="/">
                <img src={logoUrl} className={s.dots} alt={logo} />
                <span className={s.title}>{logo}</span>
              </a>
            </div>
            <div className={s.subMenu}>
              <div className={s.language}>
                <button className={s.changeLanguage} onClick={changeToEnglish}>
                  English
                </button>
                <button className={s.changeLanguage} onClick={changeToHindi}>
                  हिंदी
                </button>
              </div>
              <Categories view={view} />
            </div>
            <div className={s.search}>Search</div>

            <div className={s.social}>
              <ul>
                <li>
                  <a
                    href={`https://twitter.com/${
                      hindi ? 'NyaayaHindi' : 'NyaayaIN'
                    }`}
                    className={s.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href={`https://facebook.com/${
                      hindi ? 'NyaayaHindi' : 'nyaayain'
                    }`}
                    className={s.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href={`https://www.instagram.com/${
                      hindi ? 'NyaayaHindi' : 'nyaayain'
                    }`}
                    className={s.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919650108107"
                    className={s.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
