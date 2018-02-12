import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Categories.css';
import Link from '../Link';
import history from '../../history';

const API = '/data/categories';

class Categories extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      view: props.view,
      menuClass: "hidden",
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

  toggleMenu = event => {
    event.preventDefault();
    this.setState({
      menuClass: this.state.menuClass === "hidden" ? "show" : "hidden"
    });
  };

  handleClick = event => {
    event.preventDefault();
    const url = event.target.attributes.getNamedItem('data-url').value;
    this.setState({
      menuClass: this.state.menuClass === "hidden" ? "show" : "hidden"
    });
    history.push(url);
  };

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
        <button
          className={s.mobileMenu}
          onClick={this.toggleMenu}>
            {this.state.view}
        </button>
        <div className={s.container+" "+s[this.state.menuClass]}>
          <ul className={s.categories}>
            {this.state.categories.map((category) => (
              <li className={s.category} key={category.id}>
                <Link className={s.categoryLink} to={category.url}>
                  {category.name} &#9662;
                </Link>
                <ul className={s.topics}>
                  {category.topics.map((topic) => (
                    <li className={s.topic} key={topic.id}>
                      <div className={s.topicLink} data-url={topic.url} onClick={this.handleClick}>
                        {topic.name}
                      </div>
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
