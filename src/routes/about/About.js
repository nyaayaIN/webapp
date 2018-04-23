import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './About.css';
import about from './content/about.md';
import team from './content/team.md';

import adrija from './content/adrija.md';
import archana from './content/archana.md';
import malavika from './content/malavika.md';
import mustafa from './content/mustafa.md';
import shonottra from './content/shonottra.md';
import sumeysh from './content/sumeysh.md';

import adrijaImage from './images/adrija.png';
import archanaImage from './images/archana.png';
import malavikaImage from './images/malavika.png';
import mustafaImage from './images/mustafa.png';
import shonottraImage from './images/shonottra.png';
import sumeyshImage from './images/sumeysh.png';

import Nilekani from './Nilekani.png';

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
    const teamImages = [
      adrijaImage,
      archanaImage,
      malavikaImage,
      mustafaImage,
      shonottraImage,
      sumeyshImage,
    ];
    return (
      <div>
        <div className={s.aboutSection}>
          <div className={s.aboutUs}>
            <div className={s.container}>
              <img
                alt="Rohini Nilekani Philanthropies"
                className={s.nilekaniLogo}
                src={Nilekani}
              />
              <h1 className={s.aboutTitle}>{about.title}</h1>
              <div
                className={s.aboutContent}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: about.html }}
              />
            </div>
          </div>
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
              {teamMembers.map((member, index) => (
                <div className={s.teamMember} key={member.id}>
                  <img
                    className={s.teamMemberImage}
                    src={teamImages[index]}
                    alt={member.name}
                  />
                  <div className={s.teamMemberContent}>
                    <div className={s.teamMemberName}>{member.name}</div>
                    <div className={s.teamMemberTitle}>{member.title}</div>
                    <div
                      className={s.teamMemberBio}
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: member.html }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(About);
