import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Explanations.css';
import history from '../../history';

class Explanations extends React.Component {
  static propTypes = {
    collection: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      }),
    ).isRequired,
    defaultExplanation: PropTypes.string.isRequired,
  };

  componentDidMount() {
    document.getElementById(this.props.defaultExplanation).style.display =
      'block';
    if (window.location.hash) {
      const selected = window.location.hash.split('#')[1];
      document.getElementById(this.props.defaultExplanation).style.display =
        'none';
      document.getElementById(selected).style.display = 'block';
    }
  }

  handleClick = event => {
    event.preventDefault();
    const currentSlug = window.location.hash.split('#')[1];
    if (currentSlug) {
      document.getElementById(currentSlug).style.display = 'none';
    } else {
      document.getElementById(this.props.collection[0].slug).style.display =
        'none';
    }
    const slug = event.target.attributes.getNamedItem('data-slug').value;
    document.getElementById(slug).style.display = 'block';
    history.push({
      hash: slug,
    });
  };

  render() {
    return (
      <div className={s.root} id="explanations">
        <div className={s.menu}>
          {this.props.collection.map(explanation => (
            <button
              className={s.item}
              onClick={this.handleClick}
              key={explanation.id}
              data-slug={explanation.slug}
            >
              {explanation.title}
            </button>
          ))}
        </div>
        <div className={s.explanationContainer} id="explanation">
          {this.props.collection.map(explanation => (
            <div
              className={s.explanation}
              id={explanation.slug}
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
