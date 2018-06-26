import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Follow.css';

import mail from './mail-icon.svg';
import facebook from './facebook-icon.svg';
import twitter from './twitter-icon.svg';
import linkedin from './linkedin-icon.svg';

const I18N_API = '/data/localization/follow';

class Follow extends React.Component {
  constructor() {
    super();
    this.state = {
      i18n: {},
    };
  }

  componentDidMount() {
    fetch(I18N_API)
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText || 'No Response');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => this.setState({ i18n: data }))
      .catch(() => {});
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.content}>
            <h1 className={s.title}>{this.state.i18n.title}</h1>
            <p className={s.cta}>{this.state.i18n.cta}</p>
          </div>

          <div className={s.socialMedia}>
            <a
              href="mailto:contact@nyaaya.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={s.iconContainer}>
                <img src={mail} alt={this.state.i18n.mail} className={s.icon} />
              </div>
            </a>
            <a
              href="https://facebook.com/nyaayain/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={s.iconContainer}>
                <img
                  src={facebook}
                  alt={this.state.i18n.facebook}
                  className={s.facebookIcon}
                />
              </div>
            </a>
            <a
              href="https://twitter.com/NyaayaIN"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={s.iconContainer}>
                <img
                  src={twitter}
                  alt={this.state.i18n.twitter}
                  className={s.icon}
                />
              </div>
            </a>
            <a
              href="https://www.linkedin.com/company/nyaaya/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={s.iconContainer}>
                <img
                  src={linkedin}
                  alt={this.state.i18n.linkedin}
                  className={s.icon}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Follow);
