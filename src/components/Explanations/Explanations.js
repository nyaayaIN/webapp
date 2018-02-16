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
    const scrollToExplanation = false;
    this.state = {
      chosenIndex: props.chosen || 0,
      scrollToExplanation: props.chosen ? true : false
    };
  }

  componentDidMount() {
    if(this.state.scrollToExplanation) {
      document.getElementById("explanation").scrollIntoView(true);
    }
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({
      chosenIndex: event.target.attributes.getNamedItem('data-id').value
    });
    document.getElementById("explanation").scrollIntoView(true);
  };

  render() {
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
        <div className={s.explanation} id="explanation">
            <h2 className={s.title}>
                  {this.props.collection[this.state.chosenIndex].title}
            </h2>
            <div
              className={s.content}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: this.props.collection[this.state.chosenIndex].content,
              }}
            />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Explanations);
