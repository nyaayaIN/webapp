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
    document.getElementById(`qna-${id}`).classList.toggle(s.hide);
  };

  render() {
    return (
      <div className={s.root} id="qna">
        <div className={s.container}>
          <div className={s.title}>Questions and Answers</div>
          <div className={s.subtitle}>
            Click on a question to view the answer
          </div>
          {this.props.collection.map((qna, index) => (
            <div className={s.couplet} key={qna.id}>
              <button
                className={s.question}
                data-question={index}
                onClick={this.handleClick}
              >
                {index + 1}. {qna.question}
              </button>
              <div
                className={`${s.answer} ${s.hide}`}
                id={`qna-${index}`}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: qna.answer,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(QnA);
