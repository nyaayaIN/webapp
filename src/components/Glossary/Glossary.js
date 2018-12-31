import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Glossary.css';

class Glossary extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      glossary: [],
      selectedTerm: 0,
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
    const API = `/data/topic/${id}/glossary`;

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
          glossary: data,
          selectedTerm: 0,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleClick = event => {
    event.preventDefault();

    const oldTerm = document.getElementById(`term${this.state.selectedTerm}`);
    const newIndex = event.target.attributes.getNamedItem('data-id').value;
    const newTerm = document.getElementById(`term${newIndex}`);

    oldTerm.style.display = 'none';
    this.state.selectedTerm = newIndex;
    newTerm.style.display = 'block';
  };

  render() {
    return (
      <div className={s.root} id="glossary">
        <div className={s.glossarySection}>
          {this.state.glossary
            .filter(word => word.term.length > 0)
            .map((word, index) => (
              <div
                className={s.definedTerm}
                id={`term${index}`}
                key={word.id}
                style={
                  index === this.state.selectedTerm ? { display: 'block' } : {}
                }
              >
                <div className={s.glossaryItem}>
                  <div className={s.term}>{word.term}</div>
                  <div className={s.definition}>{word.definition}</div>
                </div>
              </div>
            ))}
        </div>
        <div className={s.terms}>
          {this.state.glossary
            .filter(word => word.term.length > 0)
            .map((word, index) => (
              <button
                key={word.id}
                data-id={index}
                className={s.termOption}
                onClick={this.handleClick}
              >
                {word.term}
              </button>
            ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Glossary);
