import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FavoritesPage.css';

function FavoritesPage({ favorites }) {
  const navigate = useNavigate();

  return (
    <div className="favorites-page">
      <button className="back-button" onClick={() => navigate('/results')}>
        &larr; Back to Results
      </button>
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((favorite, index) => (
            <li key={index} className="favorite-item">
              <h3>{favorite.location_name}</h3>
              <p>
                <strong>Address:</strong> {favorite.address}
              </p>
              <p>
                <strong>Phone:</strong> {favorite.phone_number}
              </p>
              {favorite.description && (
                <p>
                  <strong>Description:</strong> {favorite.description}
                </p>
              )}
              {favorite.link && (
                <p>
                  <strong>Website:</strong>{' '}
                  <a href={favorite.link} target="_blank" rel="noopener noreferrer">
                    {favorite.link}
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage