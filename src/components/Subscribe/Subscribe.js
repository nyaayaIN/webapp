import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Subscribe.css';

const I18N_API = '/data/localization/subscribe';

class Subscribe extends React.Component {
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
          <div className={s.cta}>{this.state.i18n.cta}</div>
          <form
            className={s.form}
            action="https://nyaaya.createsend.com/t/d/s/fjrjil/"
            method="post"
            data-id=""
          >
            <input
              className={s.input}
              placeholder={this.state.i18n.email}
              name="cm-fjrjil-fjrjil"
              type="email"
              required
            />
            <button className={s.button} type="submit">
              {this.state.i18n.action}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Subscribe);
