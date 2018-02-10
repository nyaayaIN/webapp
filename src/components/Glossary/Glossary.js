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
    this.state = {
      chosen: props.collection[0]
    };
  }

  handleClick = event => {
    event.preventDefault();
    const index = event.target.attributes.getNamedItem('data-id').value;
    this.setState({
      chosen: this.props.collection[index]
    })
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.title}>Glossary</div>
          <div className={s.glossarySection}>
            <div className={s.definedTerm}>
              <div className={s.glossaryItem}>
                <div className={s.term}>{this.state.chosen.term}</div>
                <div className={s.definition}>{this.state.chosen.definition}</div>
              </div>
            </div>
              <div className={s.terms}>
                {this.props.collection.map((word, index) => (
                  <button
                      key={word.id}
                      data-id={index}
                      className={s.termOption}
                      onClick={this.handleClick} >
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
