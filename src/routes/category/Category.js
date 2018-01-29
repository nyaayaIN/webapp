import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Category.css';

class Category extends React.Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.categoryName}>
            {this.props.categoryName} - {this.props.slug}
          </h1>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Category);
