import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Hero.css';

class Hero extends React.Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    content: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const heroStyle = {
      backgroundImage: "url("+this.props.image+")"
    };
    return (
      <div className={s.root} style={heroStyle}>
        <div className={s.container}>
          <div className={s.content+" "+s[this.props.style]+" "+s[this.props.theme]}>
            <h1 className={s.title}>{this.props.content.title}</h1>
            <div
              className={s.description}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: this.props.content.description }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Hero);
