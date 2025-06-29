import React from 'react';
import "./services.css";

import pb from '../../pocketbase'; 
import { useState, useEffect } from 'react';

const Services = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const records = await pb.collection('ServiceData').getFullList();

        // Append image URL to each record
        const servicesWithUrls = records.map((record) => ({
          id: record.id,
          title: record.title,
          description: record.description,
          image: pb.files.getURL(record, record.image),
          background: record.background,
          
        }));

        setServices(servicesWithUrls);
      } catch (error) {
        console.error('Error fetching ServiceData:', error);
      }
    };

    fetchServices();
  }, []);


  return (
    <section className="services container section" id="services">
      <h2 className="section__title">Services</h2>
      <div className="services__container grid">

        {services.map(({ id, image, title, description, background }) => (
          <div className="services__card" key={id} style={{backgroundColor: background, boxShadow: `0px 5px 20px 0px ${background}`}}>
            <img src={image} alt={title} className="services__img" />
            <h3 className="services__title">{title}</h3>
            <p className="services__description">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services