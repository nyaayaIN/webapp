import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Topics from '../../components/Topics';
import Hero from '../../components/Hero';

import heroUrl from './nyaaya-bridges-gaps.jpg';

class Home extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      hero_title: PropTypes.string.isRequired,
      hero_description: PropTypes.string.isRequired,
      popular_topics_in: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      governanceTopics: [],
      socialTopics: [],
    };
  }

  componentDidMount() {
    this.getFeaturedTopics('governance-and-public-affairs', 'governanceTopics');
    this.getFeaturedTopics('social-issues', 'socialTopics');
  }

  getFeaturedTopics(slug, stateKey) {
    const API = `/data/topics/featured/${slug}`;
    fetch(API)
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText || 'No Response');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        const newState = {};
        newState[stateKey] = data;
        this.setState(newState);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const heroContent = {
      title: this.props.content.hero_title,
      description: this.props.content.hero_description,
    };

    return (
      <div className={s.root}>
        <Hero
          content={heroContent}
          type="bottom"
          image={heroUrl}
          theme="dark"
        />

        <div>
          <div className={s.container}>
            <div className={s.heading}>
              {this.props.content.popular_topics_in}
            </div>
            <Topics collection={this.state.governanceTopics} />
            <Topics collection={this.state.socialTopics} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
