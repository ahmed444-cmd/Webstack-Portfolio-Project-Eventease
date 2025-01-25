import React from 'react';
import '../styles/speakers.css';
import johnDoe from '../assets/images/speakers/john_doe.jpg';
import janeSmith from '../assets/images/speakers/jane_smith.jpg';

const speakerData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO & Founder',
    company: 'Tech Innovations',
    bio: 'Leading expert in AI and machine learning with over 15 years of experience.',
    image: johnDoe,
    social: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe'
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CTO',
    company: 'Cloud Solutions',
    bio: 'Pioneer in cloud computing and distributed systems architecture.',
    image: janeSmith,
    social: {
      twitter: 'https://twitter.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith'
    }
  }
];

const Speakers = () => {
  return (
    <div className="speakers-grid">
      {speakerData.map((speaker) => (
        <div key={speaker.id} className="speaker-card">
          <div className="speaker-image">
            <img src={speaker.image} alt={speaker.name} />
          </div>
          <div className="speaker-info">
            <h3>{speaker.name}</h3>
            <p className="speaker-role">{speaker.role}</p>
            <p className="speaker-company">{speaker.company}</p>
            <p className="speaker-bio">{speaker.bio}</p>
            <div className="speaker-social">
              <a href={speaker.social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href={speaker.social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Speakers;
