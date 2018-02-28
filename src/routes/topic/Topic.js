import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Topic.css';

import Hero from '../../components/Hero';
import Explanations from '../../components/Explanations';
import Glossary from '../../components/Glossary';
import QnA from '../../components/QnA';

const CLOUDINARY = `https://res.cloudinary.com/nyaaya-testing/image/upload/`;

class Topic extends React.Component {
  static propTypes = {
    hero: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    chosen: PropTypes.shape({
      explanation: PropTypes.number.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      explanations: [{ id: '', title: '', content: '' }],
      qna: [{ id: '', question: '', answer: '' }],
      glossary: [{ id: '', term: '', definition: '' }],
      error: false,
    };
  }

  componentDidMount() {
    fetch('/data/topic/5a94b5acdc1d0e95301fb706/glossary')
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText || 'No Response');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ glossary: data });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });

    fetch('/data/topic/5a94b5acdc1d0e95301fb706/explanations')
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText || 'No Response');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ explanations: data });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });

    fetch('/data/topic/5a94b5acdc1d0e95301fb706/qna')
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText || 'No Response');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ qna: data });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  handleClick = event => {
    event.preventDefault();
    const sectionId = event.target.attributes.getNamedItem('data-scroll').value;
    document.getElementById(sectionId).scrollIntoView(true);
  };

  render() {
    const summary = {
      title: this.props.name,
      description: this.props.summary,
    };
    return (
      <div className={s.root}>
        <Hero
          content={summary}
          type="bottom"
          image={`${CLOUDINARY + this.props.hero}.jpg`}
          theme="dark"
        />

        <div className={s.topMenu}>
          <div className={s.container}>
            <button
              className={s.menuItem}
              data-scroll="explanations"
              onClick={this.handleClick}
            >
              Explanations
            </button>
            <button
              className={s.menuItem}
              data-scroll="qna"
              onClick={this.handleClick}
            >
              Questions
            </button>
            <button
              className={s.menuItem}
              data-scroll="glossary"
              onClick={this.handleClick}
            >
              Glossary
            </button>
            <p>{this.state.error}</p>
          </div>
        </div>

        <Explanations
          collection={this.state.explanations}
          chosen={this.props.chosen.explanation}
        />

        <QnA collection={this.state.qna} />

        <Glossary collection={this.state.glossary} />
      </div>
    );
  }
}

export default withStyles(s)(Topic);
