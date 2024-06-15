import './App.css';

import React, { useState } from 'react';

import Spinner from './components/Spinner';
import WeatherForm from './components/WeatherForm';
import WeatherInfo from './components/WeatherInfo';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/weather/${city}`);
      const data = await response.json();
      if (data.success) {
        setWeather({
          city: data.weather.city,
          description: data.weather.description,
          temperature: data.weather.temperature,
          humidity: data.weather.humidity,
        });
      } else {
        setWeather(null);
        setError(data.errorMessage);
      }
    } catch (error) {
      setWeather(null);
      setError('Error fetching weather data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Weather App</h1>
      <WeatherForm onSearch={fetchWeather} />
      {loading && <Spinner />}
      {error && <div className="alert alert-danger">{error}</div>}
      <WeatherInfo weather={weather} />
    </div>
  );
};

export default App;
