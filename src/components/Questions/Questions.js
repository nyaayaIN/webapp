import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Questions.css';
import Link from '../Link';

class Questions extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      questions: [],
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
    const API = `/data/topic/${id}/questions`;

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
          questions: data,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className={s.root} id="topic-questions">
        <div className={s.heading}>Questions</div>
        <div className={s.container}>
          {this.state.questions
            .filter(question => question.text.length > 0)
            .map(question => (
              <Link
                to={`/question/${question.slug}`}
                className={s.question}
                key={question.id}
              >
                <div className={s.text}>{question.text}</div>
                <div className={s.action}>View Answer</div>
              </Link>
            ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Questions);
