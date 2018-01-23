import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FeaturedTopics.css';

import Link from '../Link';

const API = '/data/featuredTopics';

class FeaturedTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredTopics: [],
      error: false,
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
      .then(data => this.setState({ featuredTopics: data }))
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  render() {
    if (this.state.error) {
      return (
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.errorText}>
              Whoops! Something went wrong in getting Featured Listing
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={s.root}>
        <div className={[s.container, s.pushTop, s.pushBottom].join(' ')}>
          <h1 className={s.center}>Featured Articles </h1>
          <h3 className={s.center}>Read More &gt;</h3>
          <div className={s.colContainer}>
            {this.state.featuredTopics.map(featuredTopics => (
              <div
                className={[s.col, s.floatingBox, s.light].join(' ')}
                key={featuredTopics.id}
              >
                <Link to={featuredTopics.url}>{featuredTopics.name}</Link>
                <p className={[s.small, s.light].join(' ')}>
                  {' '}
                  {featuredTopics['summary.EN']}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(FeaturedTopics);
