import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './QnA.css';
import history from '../../history';

class QnA extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      questionsAndAnswers: [],
      selectedQuestion: null,
    };
  }

  componentDidMount() {
    this.getData(this.props.id);
  }

  componentDidUpdate(prev) {
    if (prev.id !== this.props.id) {
      this.getData(this.props.id);
    }
  }

  getData(id) {
    const API = `/data/topic/${id}/qna`;

    fetch(API)
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText || 'No Response');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        const hash = window.location.hash || '#';
        const selectedQuestion = hash.startsWith('#qna-')
          ? parseInt(hash.split('#qna-')[1], 10)
          : null;
        this.setState({
          questionsAndAnswers: data,
          selectedQuestion,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleClick = event => {
    event.preventDefault();
    const questionIndex = event.target.attributes.getNamedItem('data-question');
    this.setState({
      selectedQuestion: parseInt(questionIndex.value, 10),
    });
    history.push({
      hash: `qna-${questionIndex.value}`,
    });
  };

  render() {
    return (
      <div className={s.root} id="qna">
        <div className={s.container}>
          {this.state.questionsAndAnswers
            .filter(qna => qna.question.length > 0)
            .map((qna, index) => (
              <div className={s.couplet} key={qna.id} id={`qna-${index}`}>
                <button
                  className={s.question}
                  data-question={index}
                  key={qna.id}
                  onClick={this.handleClick}
                >
                  {qna.question}
                </button>
                <div
                  className={
                    index === this.state.selectedQuestion
                      ? s.answer
                      : `${s.answer} ${s.hide}`
                  }
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
