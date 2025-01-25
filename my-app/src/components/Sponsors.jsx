import React from 'react';
import '../styles/sponsors.css';
import cloudSphereLogo from '../assets/sponsors/cloudsphere.svg';
import innovateLabsLogo from '../assets/sponsors/innovatelabs.svg';
import greenTechLogo from '../assets/sponsors/greentech.svg';
import cyberGuardLogo from '../assets/sponsors/cyberguard.svg';
import dataFlowLogo from '../assets/sponsors/dataflow.svg';
import roboTechLogo from '../assets/sponsors/robotech.svg';
import quantumLeapLogo from '../assets/sponsors/quantumleap.svg';
import smartAiLogo from '../assets/sponsors/smartai.svg';

const sponsorData = [
  {
    id: 1,
    name: 'CloudSphere',
    logo: cloudSphereLogo,
    website: 'https://example.com',
    tier: 'platinum'
  },
  {
    id: 2,
    name: 'InnovateLabs',
    logo: innovateLabsLogo,
    website: 'https://example.com',
    tier: 'platinum'
  },
  {
    id: 3,
    name: 'GreenTech',
    logo: greenTechLogo,
    website: 'https://example.com',
    tier: 'gold'
  },
  {
    id: 4,
    name: 'CyberGuard',
    logo: cyberGuardLogo,
    website: 'https://example.com',
    tier: 'gold'
  },
  {
    id: 5,
    name: 'DataFlow',
    logo: dataFlowLogo,
    website: 'https://example.com',
    tier: 'gold'
  },
  {
    id: 6,
    name: 'RoboTech',
    logo: roboTechLogo,
    website: 'https://example.com',
    tier: 'silver'
  },
  {
    id: 7,
    name: 'QuantumLeap',
    logo: quantumLeapLogo,
    website: 'https://example.com',
    tier: 'silver'
  },
  {
    id: 8,
    name: 'SmartAI',
    logo: smartAiLogo,
    website: 'https://example.com',
    tier: 'silver'
  }
];

const Sponsors = () => {
  const renderSponsorTier = (tier, title) => {
    const tierSponsors = sponsorData.filter(sponsor => sponsor.tier === tier);
    
    return tierSponsors.length > 0 ? (
      <div className="sponsor-tier">
        <h3>{title}</h3>
        <div className="sponsor-grid">
          {tierSponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="sponsor-item"
              title={sponsor.name}
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                className="sponsor-logo"
              />
              <span className="sponsor-name">{sponsor.name}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="sponsors-container">
      {renderSponsorTier('platinum', 'Platinum Sponsors')}
      {renderSponsorTier('gold', 'Gold Sponsors')}
      {renderSponsorTier('silver', 'Silver Sponsors')}
    </div>
  );
};

export default Sponsors;
