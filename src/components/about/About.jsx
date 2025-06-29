import React, { use } from "react";
import "./about.css";
import Image from "../../assets/avatar-2.svg";
import AboutBox from "./AboutBox";

import pb from "../../pocketbase";
import { useState, useEffect } from "react";

const About = () => {
  const [avatarUrl, setavatarUrl] = useState("");

  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    //Fetching My Avatar
    const fetchLogo = async () => {
      try {
        // Get the record where Name == "Avatar"
        const record = await pb
          .collection("HomeImages")
          .getFirstListItem('Name="Me"');

        // Construct image URL using PocketBase SDK
        const url = pb.files.getURL(record, record.Image);
        setavatarUrl(url);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();

    //Fetching Description

    const fetchDescription = async () => {
      try {
        const record = await pb
          .collection("AboutDescription")
          .getFirstListItem("");
        const desc = record.Name;
        setDescription(desc);
      } catch (error) {
        console.error("Error fetching HomeName:", error);
      }
    };

    fetchDescription();

    //Fetching Skills

    const fetchSkills = async () => {
      try {
        const records = await pb.collection("AboutSkills").getFullList();
        setSkills(records);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section className="about container" id="about">
      <h2 className="section__title">About Me</h2>

      <div className="about__container grid">
        <img src={avatarUrl} alt="" className="about__img" />

        <div className="about__data grid">
          <div className="about__info">
            <p className="about__description">{description}</p>
            <a href="" className="btn">
              Download CV
            </a>
          </div>

          <div className="about__skills grid">
            {skills.map((skill) => (
              <div className="skills__data" key={skill.id}>
                <div className="skills__titles">
                  <h3 className="skills__name">{skill.Name}</h3>
                  <span className="skills__number">{skill.Percentage}%</span>
                </div>

                <div className="skills__bar">
                  <span
                    className="skills__percentage development"
                    style={{
                      backgroundColor: skill.BackgroundColor,
                      width: `${skill.Percentage}%`,
                    }}
                  ></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AboutBox />
    </section>
  );
};

export default About;
