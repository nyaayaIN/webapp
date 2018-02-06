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
      follow_us: PropTypes.string.isRequired,
      word_of_the_day: PropTypes.string.isRequired,
      featured_questions: PropTypes.string.isRequired,
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
        <Hero content={this.props.hero} style="bottom" image={heroUrl}/>
        <div className={s.container}>
          <div className={s.heading}>{this.props.headings.featured_topics}</div>
          <Topics collection={this.props.featured.topics} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
