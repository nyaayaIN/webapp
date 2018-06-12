import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import Share from '../Share';
import s from './Explanations.css';
import history from '../../history';

const i18n = {
  explanations: {
    title: 'Contents',
  },
};

class Explanations extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      explanations: [],
      selectedExplanation: '',
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

  getSelectedExplanation = function(explanations) {
    return !window.location.hash.length ||
      window.location.hash.startsWith('#qna')
      ? explanations[0].slug
      : window.location.hash.split('#')[1];
  };

  getData(id) {
    const API = `/data/topic/${id}/explanations`;

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
          explanations: data,
          selectedExplanation: this.getSelectedExplanation(data),
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleClick = event => {
    event.preventDefault();
    const explanationSlug = event.target.attributes.getNamedItem('data-slug')
      .value;
    this.setState({
      selectedExplanation: explanationSlug,
    });
    history.push({
      hash: explanationSlug,
    });
  };

  render() {
    return (
      <div className={s.root} id="explanations">
        <div className={s.menu}>
          <h3 className={s.menuTitle}>{i18n.explanations.title}</h3>
          {this.state.explanations.map(explanation => (
            <button
              className={
                this.state.selectedExplanation === explanation.slug
                  ? `${s.item} ${s.selected}`
                  : s.item
              }
              onClick={this.handleClick}
              key={explanation.id}
              data-slug={explanation.slug}
            >
              {explanation.title}
            </button>
          ))}
        </div>
        <div className={s.explanationContainer} id="explanation">
          {this.state.explanations.map(explanation => (
            <div
              className={
                this.state.selectedExplanation === explanation.slug
                  ? `${s.explanation} ${s.selected}`
                  : s.explanation
              }
              id={explanation.slug}
              key={explanation.id}
            >
              <div className={s.content}>
                <h2>{explanation.title}</h2>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: explanation.content,
                  }}
                />
              </div>
              <Share
                url={`https://nyaaya.in/topic/${this.props.slug}#${
                  explanation.slug
                }`}
                title={`${this.props.title}: ${explanation.title}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Explanations);
