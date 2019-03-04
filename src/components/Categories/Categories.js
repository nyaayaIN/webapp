import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../Link';
import s from './Categories.css';

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
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText || 'No Response');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        const categories = data;
        this.setState({ categories });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className={s.menu}>
        <ul>
          {this.state.categories
            .filter(category => category.name.length > 0)
            .map(category => (
              <li key={category.id}>
                <Link to={category.url}>{category.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default withStyles(s)(Categories);
