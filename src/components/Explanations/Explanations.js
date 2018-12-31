import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import Link from '../Link';
import Share from '../Share';
import s from './Explanations.css';

class Explanations extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    chosen: PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      explanations: [],
      defaultChoice: '',
    };
  }

  componentDidMount() {
    this.getData(this.props.id, this.props.chosen);
  }

  componentDidUpdate(prev) {
    if (prev.id !== this.props.id) {
      this.getData(this.props.id);
    }
  }

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
          defaultChoice: data[0].slug,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const chosenExplanation = this.props.chosen.length
      ? this.props.chosen
      : this.state.defaultChoice;
    return (
      <div className={s.root} id="explanations">
        <div className={s.menu}>
          {this.state.explanations
            .filter(explanation => explanation.title.length > 0)
            .map(explanation => (
              <Link
                className={
                  explanation.slug === chosenExplanation
                    ? `${s.item} ${s.selected}`
                    : s.item
                }
                key={explanation.slug}
                to={`/topic/${this.props.slug}/${explanation.slug}`}
              >
                {explanation.title}
              </Link>
            ))}
        </div>
        <div className={s.explanationContainer} id="explanation">
          {this.state.explanations
            .filter(explanation => explanation.title.length > 0)
            .map(explanation => (
              <div
                className={
                  explanation.slug === chosenExplanation
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
                  url={`https://nyaaya.in/topic/${this.props.slug}/${
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
