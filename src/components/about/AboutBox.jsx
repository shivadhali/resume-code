import React from 'react';
import pb from '../../pocketbase'; 
import { useState, useEffect } from 'react';

const AboutBox = () => {

    const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const fetchAboutTitles = async () => {
      try {
        const records = await pb.collection('AboutTitle').getFullList();
        setBoxes(records);
      } catch (error) {
        console.error('Error fetching AboutTitle data:', error);
      }
    };

    fetchAboutTitles();
  }, []);

  return (
    <div className="about__boxes grid">

        {boxes.map((item) => (
        <div className="about__box" key={item.id}>
          <i className={`about__icon ${item.icon}`}></i>

          <div>
            <h3 className="about__title">{item.title}</h3>
            <span className="about__subtitle">{item.subtitle}</span>
          </div>
        </div>
      ))}

    </div>
)
}

export default AboutBox