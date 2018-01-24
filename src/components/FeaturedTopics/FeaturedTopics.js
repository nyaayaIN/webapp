import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FeaturedTopics.css';
import Link from '../Link';

const API = '/data/featuredTopics';
const i18n = '/data/static_pages';

class FeaturedTopics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: '',
      linker: '',
      featuredTopics: [],
      error: false,
    };
  }

  componentDidMount() {
    fetch(i18n)
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText || 'No Response');
        }
        return response;
      })
      .then(response => response.json())
      .then(data =>
        this.setState({
          heading: data.featuredTopics.heading,
          linker: data.featuredTopics.linker,
        }),
      )
      .catch(error => {
        this.setState({ error: error.message });
      });
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
      return null;
    }
    return (
      <div className={s.root}>
        <div className={[s.pushTop, s.pushBottom].join(' ')}>
          <h1 className={s.center}> {this.state.heading} </h1>
          <h3 className={s.center}> {this.state.linker} </h3>
          <div className={s.container}>
            {this.state.featuredTopics.map(featuredTopics => (
              <Link
                to={featuredTopics.url}
                className={[s.floatingBox, s.light].join(' ')}
                key={featuredTopics.id}
              >
                <p className={s.textCenter}>{featuredTopics.name}</p>
                <p className={[s.small, s.light].join(' ')}>
                  {featuredTopics.summary.EN}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(FeaturedTopics);
