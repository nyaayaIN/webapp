import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import content from './contact.md';
import s from './Contact.css';

class Contact extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.contactTitle}>{content.title}</h1>
          <div
            className={s.contactContent} // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: content.html }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Contact);
