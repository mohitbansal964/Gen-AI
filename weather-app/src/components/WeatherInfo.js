import React from 'react';

const WeatherInfo = ({ weather }) => {
  if (!weather) {
    return null;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{weather.city}</h5>
        <p className="card-text">Description: {weather.description}</p>
        <p className="card-text">Temperature: {weather.temperature} °C</p>
        <p className="card-text">Humidity: {weather.humidity} %</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
