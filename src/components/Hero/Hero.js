import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Hero.css';

const flexAlignment = {
  bottom: 'flex-end',
  top: 'flex-start',
  center: 'center',
};

class Hero extends React.Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    content: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const heroStyle = {
      backgroundImage: `url(${this.props.image})`,
    };
    const contentPositionStyle = {
      alignSelf: flexAlignment[this.props.type],
    };
    const contentStyle =
      this.props.theme === 'dark' ? `${s.content} ${s.dark}` : s.content;

    return (
      <div className={s.root} style={heroStyle}>
        <div className={s.container}>
          <div className={contentStyle} style={contentPositionStyle}>
            <h1 className={s.title}>{this.props.content.title}</h1>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: this.props.content.description,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Hero);
