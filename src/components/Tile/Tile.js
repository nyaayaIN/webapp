import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';

import s from './Tile.css';
import Link from '../Link';

/* eslint-disable react/prop-types */
class Tile extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  };
  static defaultProps = {
    name: null,
    url: null,
  };

  render() {
    return (
      <Link className={s.tile} to={this.props.url}>
        <div>{this.props.name}</div>
      </Link>
    );
  }
}
/* eslint-enable react/prop-types */

export default withStyles(s)(Tile);
