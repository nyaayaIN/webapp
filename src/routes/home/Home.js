import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Topics from '../../components/Topics';
import Follow from '../../components/Follow';
import Hero from '../../components/Hero';

import heroUrl from './hero.png';

class Home extends React.Component {
  static propTypes = {
    hero: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired,
    headings: PropTypes.shape({
      featured_topics: PropTypes.string.isRequired,
      what_we_do: PropTypes.string.isRequired,
      short_explanation: PropTypes.string.isRequired,
      short_disclaimer: PropTypes.string.isRequired,
    }).isRequired,
    featured: PropTypes.shape({
      topics: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }),
      ).isRequired
    }).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <Hero content={this.props.hero} style="center" image={heroUrl} theme="light"/>
        <div className={s.featuredTopics}>
          <div className={s.container}>
            <div className={s.heading}>{this.props.headings.featured_topics}</div>
            <Topics collection={this.props.featured.topics} />
          </div>
        </div>
        <div className={s.story}>
          <div className={s.container}>
            <h2 className={s.storyTitle}
              dangerouslySetInnerHTML={{ __html: this.props.headings.what_we_do }} />
            <div className={s.shortExplanation}>{this.props.headings.short_explanation}</div>
            <div className={s.shortExplanation}>{this.props.headings.short_disclaimer}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
