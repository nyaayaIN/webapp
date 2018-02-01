import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Follow.css';

class Follow extends React.Component {
  render() {
    return (
      <div className={s.socialMedia}>
        <a
          className={s.socialLink}
          href="https://www.facebook.com/nyaayain/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={`${s.icon} ${s.facebook}`} />
        </a>
        <a
          className={s.socialLink}
          href="https://twitter.com/NyaayaIN"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={`${s.icon} ${s.twitter}`} />
        </a>
        <a
          className={s.socialLink}
          href="https://www.linkedin.com/company/nyaaya"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={`${s.icon} ${s.linkedin}`} />
        </a>
        <a
          className={s.socialLink}
          href="https://medium.com/nyaaya"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={`${s.icon} ${s.medium}`} />
        </a>
      </div>
    );
  }
}

export default withStyles(s)(Follow);
