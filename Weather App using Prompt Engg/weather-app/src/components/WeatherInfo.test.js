import { render, screen } from '@testing-library/react';

import React from 'react';
import WeatherInfo from './WeatherInfo';

describe('WeatherInfo Component', () => {
  test('renders weather information', () => {
    const weather = {
      city: 'New York',
      description: 'Sunny',
      temperature: 25,
      humidity: 60,
    };

    render(<WeatherInfo weather={weather} />);
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('Description: Sunny')).toBeInTheDocument();
    expect(screen.getByText('Temperature: 25 °C')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 60 %')).toBeInTheDocument();
  });

  test('renders nothing when weather is null', () => {
    render(<WeatherInfo weather={null} />);
    expect(screen.queryByText('Description:')).not.toBeInTheDocument();
  });
});
