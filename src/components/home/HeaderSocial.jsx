import React from 'react'
import { useState, useEffect } from 'react';
import pb from '../../pocketbase';

const HeaderSocial = () => {

    const [socials, setSocials] = useState([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const records = await pb.collection('HomeSocial').getFullList();
        setSocials(records);
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <div className="home__socials">

        {socials.map((social) => (
        <a
          key={social.id}
          href={social.Link}
          className="home__social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={social.Code}></i>
        </a>
      ))}
    </div>
  )
}

export default HeaderSocial