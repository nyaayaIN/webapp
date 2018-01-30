import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';

import s from './Tile.css';
import Link from '../Link';

class Tile extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  };

  /* static defaultProps = {
    name: 'null',
    url: '/error',
  };
*/
  render() {
    return (
      <div className={s.tile}>
        <Link to={this.props.url}>
          <div>{this.props.name}</div>
        </Link>
      </div>
    );
  }
}

export default withStyles(s)(Tile);
