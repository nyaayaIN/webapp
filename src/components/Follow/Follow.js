import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Follow.css';

import Link from '../Link';

const I18N_API = '/data/static_pages/follow';

class Follow extends React.Component {
  constructor() {
    super();
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
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.content}>
            <h1 className={s.title}>{this.state.i18n.title}</h1>
            <p className={s.cta}>{this.state.i18n.cta}</p>
          </div>

          <div className={s.socialMedia}>
            <p>Here there be icons</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Follow);
