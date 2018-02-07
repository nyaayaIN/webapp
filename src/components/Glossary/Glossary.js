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


  constructor(props) {
    super();
    let classes = [];
    props.collection.map((word, index) =>(
      classes.push(index === 0 ?
                    s.glossaryItemContainer + " " + s.active :
                    s.glossaryItemContainer)
    ));
    this.state = {
      chosenIndex: 0,
      classes : classes
    };
  }

  handleClick = event => {
    event.preventDefault();
    let newClasses = this.state.classes;

    const id = event.target.attributes.getNamedItem('data-id').value;

    newClasses[this.state.chosenIndex] = s.glossaryItemContainer;
    newClasses[id] = s.glossaryItemContainer + " " + s.active;

    this.setState({
      chosenIndex: id,
      classes: newClasses
    });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.title}>Glossary</div>
        </div>
        <div className={s.glossarySection}>
          <div className={s.container}>
            <div className={s.terms}>
              {this.props.collection.map((word, index) => (
                <button
                    className={s.termOption}
                    data-id={index}
                    onClick={this.handleClick} >
                  {word.term}
                </button>
              ))}
            </div>
            {this.props.collection.map((word, index) => (
              <div className={this.state.classes[index]}>
                <div className={s.glossaryItem}>
                  <div className={s.term} data-index={index}>{word.term}</div>
                  <div className={s.definition}>{word.definition}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Glossary);