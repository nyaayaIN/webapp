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
    let explanationClasses = [];
    props.collection.map((explanation, index) =>(
      explanationClasses.push(index === props.chosen ?
                                s.explanation + " " + s.active :
                                s.explanation)
    ));
    this.state = {
      chosenIndex: props.chosen,
      explanationClasses : explanationClasses
    };
  }

  handleClick = event => {
    event.preventDefault();
    let newClasses = this.state.explanationClasses

    const id = event.target.attributes.getNamedItem('data-id').value;

    newClasses[this.state.chosenIndex] = s.explanation;
    newClasses[id] = s.explanation + " " + s.active;

    this.setState({
      chosenIndex: id,
      explanationClasses: newClasses
    });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.collection}>
          {this.props.collection.map((explanation, index) => (
            <div  className={this.state.explanationClasses[index]}
                  data-explanation={index}
                  key={explanation.id}>
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
          <div className={s.menuHeading}>Contents</div>
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
