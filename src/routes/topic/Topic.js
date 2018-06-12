import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Topic.css';

import Hero from '../../components/Hero';
import Explanations from '../../components/Explanations';
import Glossary from '../../components/Glossary';
import Sources from '../../components/Sources';
import QnA from '../../components/QnA';

const CLOUDINARY = `https://res.cloudinary.com/nyaaya-testing/image/upload/`;

class Topic extends React.Component {
  static propTypes = {
    heroImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const heroContent = {
      title: this.props.name,
      description: this.props.summary,
    };
    return (
      <div className={s.root}>
        <Hero
          content={heroContent}
          type="bottom"
          image={`${CLOUDINARY + this.props.heroImage}.jpg`}
          theme="dark"
        />
        <div className={s.contentWrapper}>
          <Explanations
            slug={this.props.slug}
            title={this.props.name}
            id={this.props.id}
          />
          <QnA id={this.props.id} />
        </div>
        <Glossary id={this.props.id} />
        <Sources content={this.props.sources} />
      </div>
    );
  }
}

export default withStyles(s)(Topic);
