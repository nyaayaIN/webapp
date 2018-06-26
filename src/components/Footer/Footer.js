import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';
import Follow from '../Follow';
import Subscribe from '../Subscribe';

import logoUrl from './logo.png';
import ccUrl from './cc_icon_white_x2.png';
import attributionUrl from './attribution_icon_white_x2.png';
import ncUrl from './nc_white_x2.png';
import saUrl from './sa_white_x2.png';

const I18N_API = '/data/localization/footer';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i18n: {},
      error: false,
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
      .catch(error => {
        this.setState({ error: { i18n: error.message } });
      });
  }

  render() {
    if (this.state.error) {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <Follow />
            <Subscribe />
          </div>
        </div>
      );
    }
    return (
      <div className={s.root}>
        <Follow />
        <Subscribe />
        <div className={s.container}>
          <div className={s.bottom}>
            <div className={s.company}>
              <div className={s.brand}>
                <Link className={s.logo} to="/">
                  <img src={logoUrl} width="100" alt={this.state.i18n.slogan} />
                </Link>
              </div>
              <div className={s.slogan}>{this.state.i18n.slogan}</div>
            </div>
            <div className={s.terms}>
              <div className={s.licenseIcons}>
                <img
                  src={ccUrl}
                  width="30"
                  height="30"
                  alt="Creative Commons Icon"
                />
                <img
                  src={attributionUrl}
                  width="30"
                  height="30"
                  alt="Attribution Icon"
                />
                <img
                  src={ncUrl}
                  width="30"
                  height="30"
                  alt="Non-Commercial Icon"
                />
                <img
                  src={saUrl}
                  width="30"
                  height="30"
                  alt="Share Adapt Icon"
                />
              </div>
              <div
                className={s.termsText}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: this.state.i18n.terms,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
