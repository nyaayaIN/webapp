import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Glossary.css';

class Glossary extends React.Component {
  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.shape({
        term: PropTypes.string.isRequired,
        definition: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  constructor() {
    super();
    this.chosen = 0;
  }

  componentDidUpdate(prev) {
    if (prev.collection[0].term !== this.props.collection[0].term) {
      document.getElementById(`term${this.chosen}`).style.display = 'none';
      this.chosen = 0;
      document.getElementById('term0').style.display = 'block';
    }
  }

  handleClick = event => {
    event.preventDefault();

    const oldTerm = document.getElementById(`term${this.chosen}`);
    const newIndex = event.target.attributes.getNamedItem('data-id').value;
    const newTerm = document.getElementById(`term${newIndex}`);

    oldTerm.style.display = 'none';
    this.chosen = newIndex;
    newTerm.style.display = 'block';
  };

  render() {
    return (
      <div className={s.root} id="glossary">
        <div className={s.container}>
          <div className={s.title}>Glossary</div>
          <div className={s.glossarySection}>
            {this.props.collection.map((word, index) => (
              <div
                className={s.definedTerm}
                id={`term${index}`}
                key={word.id}
                style={index === this.chosen ? { display: 'block' } : {}}
              >
                <div className={s.glossaryItem}>
                  <div className={s.term}>{word.term}</div>
                  <div className={s.definition}>{word.definition}</div>
                </div>
              </div>
            ))}
            <div className={s.terms}>
              {this.props.collection.map((word, index) => (
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
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Glossary);
