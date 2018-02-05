import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './QnA.css';

class QnA extends React.Component {
  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  handleClick = event => {
    event.preventDefault();
    const id = event.target.attributes.getNamedItem('data-question').value;
    const answer = document.querySelector(`[data-answer="${id}"`);
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  };

  render() {
    return (
      <div className={s.root}>
        {this.props.collection.map((qna, index) => (
          <div className={s.couplet}>
            <button
              className={s.question}
              data-question={index}
              onClick={this.handleClick}
            >
              {qna.question}
            </button>
            <div
              className={s.answer}
              data-answer={index}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: qna.answer,
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(s)(QnA);
