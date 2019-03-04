import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Share from '../../components/Share';
import s from './Question.css';

class Question extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.contentWrapper}>
          <div className={s.contentContainer}>
            <div className={s.question}>{this.props.question}</div>
          </div>
          <div className={s.contentContainer}>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: this.props.answer.html,
              }}
              className={s.answer}
            />
            <div className={s.share}>
              <Share
                url={`https://nyaaya.in/question/${this.props.slug}`}
                title={this.props.question}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Question);
