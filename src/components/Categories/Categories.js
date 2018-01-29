import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Categories.css';
import Link from '../Link';

const API = '/data/categories';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
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
      .then(data => this.setState({ categories: data }))
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
              Whoops! Something went wrong getting categories
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={s.root}>
        <div className={s.container}>
          <ul className={s.categories}>
            {this.state.categories.map(category => (
              <li className={s.category}>
                <Link className={s.categoryLink} to={category.url}>
                  {category.name} &#9662;
                </Link>
                <ul className={s.topics}>
                  {category.topics.map(topic => (
                    <li className={s.topic}>
                      <Link className={s.topicLink} to={topic.url}>
                        {topic.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Categories);
