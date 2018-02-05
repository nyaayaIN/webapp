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
      chosenIndex: props.chosen,
    };
  }

  handleClick = event => {
    event.preventDefault();
    const current = document.querySelector('[data-hidden="false"]');
    current.style.display = 'none';
    current.setAttribute('data-hidden', 'true');

    const id = event.target.attributes.getNamedItem('data-id').value;
    const explanation = document.querySelector(`[data-explanation="${id}"`);

    explanation.style.display = 'block';
    explanation.setAttribute('data-hidden', 'false');
    this.setState({
      chosenIndex: id,
    });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.collection}>
          {this.props.collection.map((explanation, index) => (
            <div
              className={
                index === this.state.chosenIndex
                  ? `${s.explanation} ${s.active}`
                  : s.explanation
              }
              data-explanation={index}
              data-hidden={index === this.state.chosenIndex ? 'false' : 'true'}
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
      </div>
    );
  }
}

export default withStyles(s)(Explanations);
