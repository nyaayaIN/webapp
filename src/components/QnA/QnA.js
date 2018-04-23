import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './QnA.css';

const i18n = {
  qna: {
    title: 'Common Questions',
  },
};

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
        this.setState({
          questionsAndAnswers: data,
          selectedQuestion: null,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleClick = event => {
    event.preventDefault();
    const questionIndex = event.target.attributes.getNamedItem('data-question')
      .value;
    this.setState({
      selectedQuestion: parseInt(questionIndex, 10),
    });
  };

  render() {
    return (
      <div className={s.root} id="qna">
        <div className={s.container}>
          <div className={s.title}>{i18n.qna.title}</div>
          {this.state.questionsAndAnswers.map((qna, index) => (
            <div className={s.couplet} key={qna.id}>
              <button
                className={s.question}
                data-question={index}
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
