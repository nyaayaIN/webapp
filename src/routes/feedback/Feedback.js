import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feedback.css';

class Feedback extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <iframe
            id="typeform-full"
            title="Feedback form"
            className={s.typeform}
            frameBorder="0"
            src="https://nyaaya.typeform.com/to/VzmW3T"
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Feedback);
