import React from 'react';
import { useState, useEffect } from 'react';
import "./home.css";
import Me from "../../assets/avatar-1.svg"
import HeaderSocial from './HeaderSocial';
import ScrollDown from './ScrollDown';
import Shapes from './Shapes';

import pb from "../../pocketbase";


const Home = () => {

  const [avatarUrl, setavatarUrl] = useState("");
  const [myName, setMyName] = useState("");
  const [education, setEducation] = useState("");

  useEffect(() => {

    //Fetching My Avatar
    const fetchLogo = async () => {
      try {
        // Get the record where Name == "Avatar"
        const record = await pb.collection("HomeImages").getFirstListItem('Name="Me"');

        // Construct image URL using PocketBase SDK
        const url = pb.files.getURL(record, record.Image);
        setavatarUrl(url);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };

    fetchLogo();

    //Fetching My Name

    const fetchHomeName = async () => {
    try {
      const record = await pb.collection("HomeName").getFirstListItem('');
      const name = record.Name;
      setMyName(name);
    } catch (error) {
      console.error("Error fetching HomeName:", error);
    }
  };

  fetchHomeName();

    //Fetching My Education

    const fetchHomeEducation = async () => {
    try {
      const record = await pb.collection("HomeEducation").getFirstListItem('');
      const education = record.Education;
      setEducation(education);
    } catch (error) {
      console.error("Error fetching HomeName:", error);
    }
  };

  fetchHomeEducation();


  }, []);

  return (
    <section className="home container" id="home">
      <div className="intro">
        <img src={avatarUrl} alt="" className="home__img" />
        <h1 className="home__name">{myName}</h1>
        <span className="home__education">{education}</span>
        <HeaderSocial />

        <a href="#contact" className="btn">Hire Me</a>

        <ScrollDown />
      </div>

      <Shapes />
    </section>
  )
}

export default Home