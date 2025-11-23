import React from 'react';
import './TeamCard.css';

function TeamCard({ image, name, role = 'Lead' }) {
  return (
    <div className="team-card">
      <div className="card-shine" />

      <div className="card-image-container p-2">
        <img src={image} alt={name} className="card-image rounded-lg" />
      </div>

      <div className="card-content">
        <h3 className="card-name">{name}</h3>
        <div className="divider flex flex-row justify-between">
          <p className="card-role">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
