import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultsPage.css';

function ResultsPage({ resources, favorites, setFavorites }) {
  const navigate = useNavigate();

  const toggleFavorite = (resource) => {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.find(
        (fav) => fav.location_name === resource.location_name
      );
      if (isFavorited) {
        return prevFavorites.filter(
          (fav) => fav.location_name !== resource.location_name
        );
      } else {
        return [...prevFavorites, resource];
      }
    });
  };

  if (!resources || resources.length === 0) {
    return <p>No resources found. Try refining your search.</p>;
  }

  return (
    <div className="results-page">
      <div className="button-container">
        <button className="back-button" onClick={() => navigate('/')}>
          &larr; Back to Search
        </button>
        <button className="favorites-button" onClick={() => navigate('/favorites')}>
          Favorites
        </button>
      </div>
      <h1>Search Results</h1>
      <ul className="results-list">
        {resources.map((resource, index) => (
          <li key={index} className="result-item">
            <h3>{resource.location_name}</h3>
            <p>
              <strong>Address:</strong> {resource.address}
            </p>
            <p>
              <strong>Phone:</strong> {resource.phone_number}
            </p>
            <p>
              <strong>Description:</strong> {resource.description}
            </p>
            {resource.link && (
              <p>
                <strong>Website:</strong>{' '}
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  {resource.link}
                </a>
              </p>
            )}
            <p>
                <strong>Zip Code:</strong> {resource.zipcode}
            </p>
            <p>
                <strong>Proximity:</strong> {resource.distance} (difference in zip)
            </p>
            <button
              className={`favorite-button ${
                favorites.find((fav) => fav.location_name === resource.location_name)
                  ? 'favorited'
                  : ''
              }`}
              onClick={() => toggleFavorite(resource)}
            >
              {favorites.find((fav) => fav.location_name === resource.location_name)
                ? '★ Favorited'
                : '☆ Favorite'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultsPage;