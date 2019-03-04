import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Topic.css';

import Explanations from '../../components/Explanations';
import Questions from '../../components/Questions';

const CLOUDINARY = `https://res.cloudinary.com/nyaaya-testing/image/upload/w_1280,h_400,c_fill/`;

class Topic extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    heroImage: PropTypes.string,
    summary: PropTypes.string,
    explanation: PropTypes.string.isRequired,
  };

  static defaultProps = {
    heroImage: '',
    summary: '',
  };

  render() {
    return (
      <div className={s.root}>
        <div
          className={s.heroImage}
          style={{
            backgroundImage: `url(${CLOUDINARY + this.props.heroImage}.jpg)`,
          }}
        >
          <div className={s.topicHeader}>
            <div className={s.topicTitle}>{this.props.name}</div>
            <div
              className={s.topicSummary}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: this.props.summary,
              }}
            />
          </div>
        </div>
        <div className={s.contentWrapper}>
          <Explanations
            slug={this.props.slug}
            title={this.props.name}
            id={this.props.id}
            chosen={this.props.explanation}
          />
        </div>
        <Questions id={this.props.id} />
      </div>
    );
  }
}

export default withStyles(s)(Topic);
