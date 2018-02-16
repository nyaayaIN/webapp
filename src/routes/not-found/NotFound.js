/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.css';

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>{this.props.title}  ¯\_(ツ)_/¯</h1>
          <p className={s.description}>Looks like we may have moved something you&#8217;re looking for or it doesn&#8217;t exist anymore.</p>

          <hr />
          <div className={s.paths}>
            <div className={s.path}>
              <h3 className={s.subtitle}>Are you looking for our catalogue of laws or the bare text of acts?</h3>
              <p className={s.description}>We have moved our repository of central and state laws to <a href="https://github.com/nyaayaIN/laws-of-india" target="_blank">Github</a> where we maintain them in Akoma Ntoso format.</p>
            </div>
            <div className={s.path}>
              <h3 className={s.subtitle}>क्या आप हिंदी की जानकारी खोज रहे थे?</h3>
              <p>हम अपनी जानकारी और हिंदी उपयोगकर्ताओं के लिए हमारी वेबसाइट में सुधार कर रहे हैं। जल्द ही, हम और अधिक जानकारी प्रकाशित करेंगे। कृपया नीचे हमारे न्यूजलेटर के लिए साइन अप करें।</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NotFound);
