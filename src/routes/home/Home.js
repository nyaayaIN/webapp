import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Topics from '../../components/Topics';
import Follow from '../../components/Follow';
import Questions from '../../components/Questions';
import Hero from '../../components/Hero';

class Home extends React.Component {
  static propTypes = {
    hero: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
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
      ).isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <Hero content={this.props.hero} />

        <div className={s.container}>
          <div className={s.heading}>{this.props.headings.featured_topics}</div>
          <Topics collection={this.props.featured.topics} />
        </div>

        <div className={s.container}>
          <div className={s.heading}>{this.props.headings.follow_us}</div>
          <Follow />
        </div>

        <div className={s.container}>
          <div className={s.heading}>
            {this.props.headings.featured_questions}
          </div>
          <Questions collection={this.props.featured.questions} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
