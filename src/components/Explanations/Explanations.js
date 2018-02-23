import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Explanations.css';

class Explanations extends React.Component {
  static propTypes = {
    chosen: PropTypes.number.isRequired,
    collection: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  constructor(props) {
    super();
    this.state = {
      scrollToExplanation: !!props.chosen,
    };
    this.chosen = props.chosen || 0;
  }

  componentDidMount() {
    if (this.state.scrollToExplanation) {
      document.getElementById('explanation').scrollIntoView(true);
    }
  }

  componentDidUpdate(prev) {
    if (prev.collection[0].title !== this.props.collection[0].title) {
      this.chosen = 0;
      document.getElementById('explanation0').style.display = 'block';
    }
  }

  handleClick = event => {
    event.preventDefault();

    const oldExplanation = document.getElementById(`explanation${this.chosen}`);
    const newIndex = event.target.attributes.getNamedItem('data-id').value;
    const newExplanation = document.getElementById(`explanation${newIndex}`);

    oldExplanation.style.display = 'none';
    this.chosen = newIndex;
    newExplanation.style.display = 'block';

    document.getElementById('explanation').scrollIntoView(true);
  };

  render() {
    const showExplanation = {
      display: 'block',
    };

    return (
      <div className={s.root} id="explanations">
        <div className={s.menu}>
          {this.props.collection.map((explanation, index) => (
            <button
              className={s.item}
              onClick={this.handleClick}
              key={explanation.id}
              data-id={index}
            >
              {explanation.title}
            </button>
          ))}
        </div>
        <div className={s.explanationContainer} id="explanation">
          {this.props.collection.map((explanation, index) => (
            <div
              className={s.explanation}
              id={`explanation${index}`}
              style={index === this.chosen ? showExplanation : {}}
              key={explanation.id}
            >
              <h2 className={s.title}>{explanation.title}</h2>
              <div
                className={s.content}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: explanation.content,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Explanations);
