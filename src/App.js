import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import InputForm from './InputForm';
import ResultsPage from './ResultsPage';
import FavoritesPage from './FavoritesPage';
import Papa from 'papaparse';


function App() {
  const [filteredResources, setFilteredResources] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleFormSubmit = async (data) => {
    const { resource, location: userZipCode } = data;
  
    if (!resource) {
      alert('Please select a resource.');
      return;
    }
  
    // // Allow empty zip code, but enforce validation if filled
    // if (userZipCode && !/^\d{5}$/.test(userZipCode)) {
    //   alert('Please enter a valid 5-digit zip code or leave the field blank.');
    //   return;
    // }
  
    let filePath = '';
    switch (resource) {
      case 'youth':
        filePath = '/children_youth_resources.csv';
        break;
      case 'culture':
        filePath = '/culture_specific_agencies.csv';
        break;
      case 'elderly':
        filePath = '/elder_services.csv';
        break;
      case 'housing':
        filePath = '/unhoused_resources.csv';
        break;
      default:
        console.log('Invalid resource type');
        return;
    }
  
    try {
      const response = await fetch(filePath);
      const text = await response.text();
  
      Papa.parse(text, {
        header: true,
        complete: (result) => {
          const filteredData = result.data
            .filter((item) => {
              return item.zipcode && !isNaN(item.zipcode);
            })
            .map((item) => {
              const distance = userZipCode
                ? Math.abs(Number(item.zipcode) - Number(userZipCode))
                : null; // No zip code means no distance calculation
              return { ...item, distance };
            })
            .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)); // Sort by proximity, null values last
  
          setFilteredResources(filteredData);
        },
      });
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
    }
  };
  
  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Find Seattle Resources</h1>
                <InputForm onSubmit={handleFormSubmit} />
              </>
            }
          />
          <Route
            path="/results"
            element={<ResultsPage resources={filteredResources} favorites={favorites} setFavorites={setFavorites} />}
          />
          <Route
            path="/favorites"
            element={<FavoritesPage favorites={favorites} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;