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
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ categories: data }));
  }

  render() {
    const { categories } = this.state;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <ul className={s.categories}>
            {categories.map(category => (
              <li className={s.category} key={category.id}>
                <Link className={s.categoryLink} to={category.url}>
                  {category.name} &#9662;
                </Link>
                <ul className={s.topics}>
                  {category.topics.map(topic => (
                    <li className={s.topic} key={topic.id}>
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
