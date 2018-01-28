/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './About.css';
import about from './content/about.md';
import team from './content/team.md';
import mission from './content/mission.md';
import adrija from './content/adrija.md';
import archana from './content/archana.md';
import malavika from './content/malavika.md';
import mustafa from './content/mustafa.md';
import shonottra from './content/shonottra.md';
import sumeysh from './content/sumeysh.md';

class About extends React.Component {
  render() {
    const teamMembers = [
      adrija,
      archana,
      malavika,
      mustafa,
      shonottra,
      sumeysh,
    ];
    return (
      <div>
        <div className={s.aboutSection}>
          <h1 className={s.aboutTitle}>{about.title}</h1>
          <div
            className={s.aboutContent}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: about.html }}
          />
        </div>
        <div className={s.container}>
          <div className={s.teamSection}>
            <h1 className={s.aboutTitle}>{team.title}</h1>
            <div
              className={s.teamContent}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: team.html }}
            />

            <div className={s.teamMembers}>
              {teamMembers.map(member => (
                <div className={s.teamMember}>
                  <div className={s.teamMemberName}>{member.name}</div>
                  <div className={s.teamMemberTitle}>{member.title}</div>
                  <div
                    className={s.teamMemberBio}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: member.html }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={s.missionSection}>
          <h1 className={s.aboutTitle}>{mission.title}</h1>
          <div
            className={s.missionContent}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: mission.html }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(About);
