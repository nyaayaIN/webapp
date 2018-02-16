import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Topic.css';

import Hero from '../../components/Hero';
import Explanations from '../../components/Explanations';
import Glossary from '../../components/Glossary';
import QnA from '../../components/QnA';

const S3 = 'https://s3.ap-south-1.amazonaws.com/staging-image-test/images/';

class Topic extends React.Component {
  static propTypes = {
    hero: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    explanations: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ).isRequired,
    qna: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
      }),
    ).isRequired,
    glossary: PropTypes.arrayOf(
      PropTypes.shape({
        term: PropTypes.string.isRequired,
        definition: PropTypes.string.isRequired,
      }),
    ).isRequired,
    chosen: PropTypes.shape({
      explanation: PropTypes.number.isRequired,
    }).isRequired,
  };

  handleClick = event => {
    event.preventDefault();
    const sectionId = event.target.attributes.getNamedItem('data-scroll').value;
    document.getElementById(sectionId).scrollIntoView(true);
  };

  render() {
    const summary = {
      title: this.props.name,
      description: this.props.summary
    };
    return (
      <div className={s.root}>
        <Hero content={summary} style="bottom" image={S3+this.props.hero} theme="dark"/>

        <div className={s.topMenu}>
          <div className={s.container}>
            <button
                className={s.menuItem}
                data-scroll="explanations"
                onClick={this.handleClick} >
              Explanations
            </button>
            <button
                className={s.menuItem}
                data-scroll="qna"
                onClick={this.handleClick} >
              Questions
            </button>
            <button
                className={s.menuItem}
                data-scroll="glossary"
                onClick={this.handleClick} >
              Glossary
            </button>
          </div>
        </div>

        <Explanations
          collection={this.props.explanations}
          chosen={this.props.chosen.explanation}
        />

        <QnA collection={this.props.qna} />

        <Glossary
          collection={this.props.glossary}
        />
      </div>
    );
  }
}

export default withStyles(s)(Topic);
