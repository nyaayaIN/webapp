import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './Sources.css';

const i18n = {
  sources: {
    title: 'References',
  },
};

class QnA extends React.Component {
  static propTypes = {
    content: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    return (
      <div className={s.root} id="sources">
        <div className={s.container}>
          <div className={s.title}>{i18n.sources.title}</div>
          {this.props.content.map((source, index) => (
            <div className={s.source}>
              {index + 1}. {source}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(QnA);
