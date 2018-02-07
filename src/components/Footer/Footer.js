import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';
import Follow from '../Follow';
import Subscribe from '../Subscribe';

import logoUrl from './logo.png';
import ccUrl from './cc_icon_white_x2.png';
import attributionUrl from './attribution_icon_white_x2.png';
import ncUrl from './nc_white_x2.png';
import saUrl from './sa_white_x2.png';

const CATEGORIES_API = '/data/categories';
const I18N_API = '/data/static_pages/footer';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      i18n: {},
      error: false,
    };
  }

  componentDidMount() {
    fetch(CATEGORIES_API)
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText || 'No Response');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => this.setState({ categories: data }))
      .catch(error => {
        this.setState({ error: { categories: error.message } });
      });
    fetch(I18N_API)
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText || 'No Response');
        }
        return response;
      })
      .then(response => response.json())
      .then(data => this.setState({ i18n: data }))
      .catch(error => {
        this.setState({ error: { i18n: error.message } });
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
        <Follow />
        <Subscribe />
        <div className={s.container}>
          <ul className={s.categories}>
            {this.state.categories.map((category) => (
              <li className={s.category} key={category.id}>
                <Link className={s.categoryLink} to={category.url}>
                  {category.name}
                </Link>
                {category.topics.map((topic) => (
                  <Link className={s.topic} to={topic.url} key={topic.id}>
                    {topic.name}
                  </Link>
                ))}
              </li>
            ))}
          </ul>
          <div className={s.bottom}>
            <div className={s.company}>
              <div className={s.brand}>
                <Link className={s.logo} to="/">
                  <img
                    src={logoUrl}
                    width="120"
                    height="95"
                    alt={this.state.i18n.slogan}
                  />
                </Link>
              </div>
              <div className={s.slogan}>{this.state.i18n.slogan}</div>
            </div>
            <div className={s.terms}>
              <div className={s.licenseIcons}>
                <img src={ccUrl} width="30" height="30" />
                <img src={attributionUrl} width="30" height="30" />
                <img src={ncUrl} width="30" height="30" />
                <img src={saUrl} width="30" height="30" />
              </div>
              <div className={s.termsText}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: this.state.i18n.terms,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
