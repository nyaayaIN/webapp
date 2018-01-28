/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import heroContent from './hero.md';
import content from './home.md';
import Link from '../../components/Link';

const API = '/data/featured';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featured: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText || 'No Response');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => this.setState({ featured: data }))
      .catch(error => {
        // eslint-disable no-console
        console.error(error.message);
      });
  }

  render() {
    let featuredTopics;
    if (this.state.featured.length) {
      featuredTopics = (
        <div className={s.featured}>
          <div className={s.container}>
            <h1 className={s.title}>{content.featured}</h1>
            <div className={s.featuredTopics}>
              {this.state.featured.map(topic => (
                <div className={s.featuredTopic}>
                  <Link to={topic.url}>
                    <div className={s.featuredTopicTitle}>{topic.name}</div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className={s.hero}>
          <div className={s.container}>
            <h1 className={s.heroTitle}>{heroContent.lead}</h1>
            <div
              className={s.heroContent}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: heroContent.html }}
            />
            <form
              action="https://nyaaya.createsend.com/t/d/s/fjrjil/"
              method="post"
              id="subForm"
              className={s.subscriberForm}
            >
              <input
                className={s.subscribeInput}
                id="fieldName"
                name="cm-name"
                type="text"
                placeholder={content.name}
              />
              <input
                className={s.subscribeInput}
                id="fieldEmail"
                name="cm-fjrjil-fjrjil"
                type="email"
                placeholder={content.email}
                required
              />
              <button className={s.subscribeSubmit} type="submit">
                {content.subscribe}
              </button>
            </form>
          </div>
        </div>
        {featuredTopics}
        <div className={s.usp}>
          <div className={s.container}>
            <h1 className={s.title}>{content.usp}</h1>
            <div
              className={s.uspContent}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
          </div>
        </div>
        <div className={s.follow}>
          <div className={s.container}>
            <h1 className={s.title}>{content.follow}</h1>
            <div className={s.socialMedia}>
              <div className={s.social}>facebook</div>
              <div className={s.social}>twitter</div>
              <div className={s.social}>linkedin</div>
              <div className={s.social}>Medium</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
