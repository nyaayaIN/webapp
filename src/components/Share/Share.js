import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
} from 'react-share';

import s from './Share.css';

class Share extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root} id="share">
        <div className={s.sharingIcons}>
          <FacebookShareButton url={this.props.url} quote={this.props.title}>
            <i className="fab fa-facebook-f" />
          </FacebookShareButton>
          <GooglePlusShareButton url={this.props.url} title={this.props.title}>
            <i className="fab fa-google-plus-g" />
          </GooglePlusShareButton>
          <LinkedinShareButton url={this.props.url} title={this.props.title}>
            <i className="fab fa-linkedin-in" />
          </LinkedinShareButton>
          <TwitterShareButton url={this.props.url} title={this.props.title}>
            <i className="fab fa-twitter" />
          </TwitterShareButton>
          <WhatsappShareButton url={this.props.url} title={this.props.title}>
            <i className="fab fa-whatsapp" />
          </WhatsappShareButton>
          <RedditShareButton url={this.props.url} title={this.props.title}>
            <i className="fab fa-reddit-alien" />
          </RedditShareButton>
          <EmailShareButton url={this.props.url} subject={this.props.title}>
            <i className="fas fa-envelope" />
          </EmailShareButton>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Share);
