import React from 'react';
import { Helmet } from 'react-helmet-async';
import BottomGlitter from '../components/StyledText/BottomGlitter';
import Screen from '../components/screen/Screen';
import TeamCard from '../components/teams/TeamCard';
import Styles from '../components/teams/Team.module.css';
import { TeamData } from '../lib/data/TeamData';
import HalloweenBackground from '../components/halloween/HalloweenBackground';
import { getCloudinaryImage } from '../components/teams/GetCloudinaryImage';
import technicalTeamImage from '../assets/Team/WhatsApp Image 2025-11-24 at 10.42.20 PM.jpeg';

function Teams() {
  return (
    <HalloweenBackground>
      <Screen>
        <Helmet>
          <title>Our Amazing Team ✨</title>
          <meta
            name="description"
            content="Teams of Data Science Club, VIT Bhopal"
          />
          <meta
            name="keywords"
            content="Data Science, Machine Learning, Team, Data Science Club, VIT Bhopal"
          />
        </Helmet>
        <section className="mt-16 mb-12 container-70">
          <div className="my-16 w-full text-center">
            <BottomGlitter text="Our Team" />
            <h3 className="text-lg mt-8">
              The strength of the team is each individual member. The strength
              of each member is the team.
              <br />- Phil Jackson
            </h3>
          </div>
          <h2 className={Styles.postHead}>Faculty Coordinator</h2>
          <div className="flex-wrap flex justify-center gap-10 mt-8 mb-16 ">
            {TeamData.facultyCoordinator.map((item, index) => {
              return (
                <TeamCard
                  key={`${String(index)}-team`}
                  image={getCloudinaryImage(item.image)}
                  name={item.name}
                  role={item.role}
                />
              );
            })}
          </div>
          <h2 className={Styles.postHead}>Panel Members</h2>
          <div className="flex-wrap flex justify-center gap-10 mt-8 mb-16 ">
            {TeamData.PanelMembers.map((item, index) => {
              return (
                <TeamCard
                  key={`${String(index)}-team`}
                  image={getCloudinaryImage(item.image)}
                  name={item.name}
                  role={item.role}
                />
              );
            })}
          </div>
          <h2 className={Styles.postHead}>Technical Team</h2>
          <div className="flex-wrap flex justify-center gap-10 mt-8 mb-16 ">
            {TeamData.technicalTeam.map((item, index) => {
              // Use local import for technical team image
              const imageSource = item.image.startsWith('Team/')
                ? technicalTeamImage
                : getCloudinaryImage(item.image);
              return (
                <TeamCard
                  key={`${String(index)}-team`}
                  image={imageSource}
                  name={item.name}
                  role={item.role}
                />
              );
            })}
          </div>
          <h2 className={Styles.postHead}>HR Team</h2>
          <div className="flex-wrap flex justify-center gap-10 mt-8 mb-16 ">
            {TeamData.hrTeam.map((item, index) => {
              return (
                <TeamCard
                  key={`${String(index)}-team`}
                  image={getCloudinaryImage(item.image)}
                  name={item.name}
                  role={item.role}
                />
              );
            })}
          </div>
          <h2 className={Styles.postHead}>Photography Team</h2>
          <div className="flex-wrap flex justify-center gap-10 mt-8 mb-16 ">
            {TeamData.photographyTeam.map((item, index) => {
              return (
                <TeamCard
                  key={`${String(index)}-team`}
                  image={getCloudinaryImage(item.image)}
                  name={item.name}
                  role={item.role}
                />
              );
            })}
          </div>
          <h2 className={Styles.postHead}>Design Team</h2>
          <div className="flex-wrap flex justify-center gap-10 mt-8 mb-16 ">
            {TeamData.designTeam.map((item, index) => {
              return (
                <TeamCard
                  key={`${String(index)}-team`}
                  image={getCloudinaryImage(item.image)}
                  name={item.name}
                  role={item.role}
                />
              );
            })}
          </div>
          <h2 className={Styles.postHead}>Social Media Team</h2>
          <div className="flex-wrap flex justify-center gap-10 mt-8 mb-16 ">
            {TeamData.socialMediaTeam.map((item, index) => {
              return (
                <TeamCard
                  key={`${String(index)}-team`}
                  image={getCloudinaryImage(item.image)}
                  name={item.name}
                  role={item.role}
                />
              );
            })}
          </div>
          <h2 className={Styles.postHead}>Event Management Team</h2>
          <div className="flex-wrap flex justify-center gap-10 mt-8 mb-16 ">
            {TeamData.eventManagementTeam.map((item, index) => {
              return (
                <TeamCard
                  key={`${String(index)}-team`}
                  image={getCloudinaryImage(item.image)}
                  name={item.name}
                  role={item.role}
                />
              );
            })}
          </div>
          <h2 className={Styles.postHead}>Content Team</h2>
          <div className="flex-wrap flex justify-center gap-10 mt-8 mb-16 ">
            {TeamData.contentTeam.map((item, index) => {
              return (
                <TeamCard
                  key={`${String(index)}-team`}
                  image={getCloudinaryImage(item.image)}
                  name={item.name}
                  role={item.role}
                />
              );
            })}
          </div>
        </section>
      </Screen>
    </HalloweenBackground>
  );
}

export default Teams;
