import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Explanations.css';
import history from '../../history';

class Explanations extends React.Component {
  constructor(props) {
    super();
    this.state = {
      chosenIndex: null,
      title: props.collection[0].title,
      content: props.collection[0].content
    }
  }

  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  onClick(e){
    e.preventDefault();
    const id = e.target.attributes.getNamedItem('data-id').value;
    this.setState({
      title: this.props.collection[id].title,
      content: this.props.collection[id].content
    });
    history.push('#explanation'+id);
  }

  render() {
    if(window.location.href.indexOf('#explanation')>-1 && this.state.chosenIndex === null){
      const explanationIndex = window.location.href.split('#explanation')[1];
      this.setState({
        chosenIndex: explanationIndex,
        title: this.props.collection[explanationIndex].title,
        content: this.props.collection[explanationIndex].content
      });
    }
    return (
      <div className={s.root}>
        <div className={s.current}>
          <div className={s.explanation}>
            <h2 className={s.title}>{this.state.title}</h2>
            <div
              className={s.content}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: this.state.content }}
            />
          </div>
        </div>
        <ul className={s.menu}>
          {this.props.collection.map((explanation, index) => (
            <li className={s.item} onClick={this.onClick.bind(this)} key={index} data-id={index}>
              {explanation.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(s)(Explanations);
