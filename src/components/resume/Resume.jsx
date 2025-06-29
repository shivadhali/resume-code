import React, { useEffect, useState } from 'react';
import "./resume.css";
import pb from '../../pocketbase'; 
import Card from './Card';

const Resume = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const records = await pb.collection('Experience').getFullList();
        setItems(records);
      } catch (error) {
        console.error('Error fetching Experience data:', error);
      }
    };

    fetchExperience();
  }, []);

  return (
    <section className="resume container section" id="resume">
      <h2 className="section__title">Experience</h2>

      <div className="resume__container grid">
        <div className="timeline grid">
          {items
            .filter((val) => val.category === "education")
            .map((val) => (
              <Card
                key={val.id}
                icon={val.icon}
                title={val.title}
                year={val.year}
                desc={val.desc}
              />
            ))}
        </div>

        <div className="timeline grid">
          {items
            .filter((val) => val.category === "experience")
            .map((val) => (
              <Card
                key={val.id}
                icon={val.icon}
                title={val.title}
                year={val.year}
                desc={val.desc}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
